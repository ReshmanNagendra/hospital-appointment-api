import prisma from "./lib/prisma";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments";

async function main() {
  console.log("===== PATIENT CRUD =====");
  const patient = await createPatient({
    name: "Test Patient",
    email: `test.patient.${Date.now()}@example.com`,
    phone: "9876500000",
    dateOfBirth: new Date("2000-01-15"),
  });
  console.log("1. createPatient:", patient);

  const fetchedPatient = await getPatient(patient.id);
  console.log("2. getPatient:", fetchedPatient);

  const searched = await searchPatients("Test");
  console.log("3. searchPatients:", searched);

  const updatedPatient = await updatePatientPhone(patient.id, "9876543210");
  console.log("4. updatePatientPhone:", updatedPatient);

  console.log("\n===== DOCTOR CRUD =====");
  const doctor = await createDoctor({
    name: "Dr. Test Doctor",
    specialty: "Cardiology",
    email: `test.doctor.${Date.now()}@hospital.io`,
  });
  console.log("5. createDoctor:", doctor);

  const fetchedDoctor = await getDoctor(doctor.id);
  console.log("6. getDoctor:", fetchedDoctor);

  const specialists = await listDoctorsBySpecialty("Cardio");
  console.log("7. listDoctorsBySpecialty:", specialists);

  console.log("\n===== APPOINTMENT CRUD =====");
  const apptDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const appt = await bookAppointment(
    patient.id,
    doctor.id,
    apptDate,
    "Routine Heart Checkup"
  );
  console.log("8. bookAppointment:", appt);

  const fullAppt = await getAppointmentFull(appt.id);
  console.log("9. getAppointmentFull:", fullAppt);

  const upcoming = await getDoctorUpcomingAppointments(doctor.id);
  console.log("10. getDoctorUpcomingAppointments:", upcoming);

  const updatedStatus = await setAppointmentStatus(appt.id, "completed");
  console.log("11. setAppointmentStatus:", updatedStatus);

  const cancelledCount = await cancelAllPatientAppointments(patient.id);
  console.log("12. cancelAllPatientAppointments (count):", cancelledCount);

  console.log("\n===== CLEANUP / DELETE =====");
  const deletedAppt = await deleteAppointment(appt.id);
  console.log("13. deleteAppointment:", deletedAppt);

  const deletedDoctor = await deleteDoctor(doctor.id);
  console.log("14. deleteDoctor:", deletedDoctor);

  const deletedPatient = await deletePatient(patient.id);
  console.log("15. deletePatient:", deletedPatient);

  console.log("\nAll 15 operations completed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

