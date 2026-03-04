import { doctors } from "./Doctors";
import { services } from "./Services";

export const specialties = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart and cardiovascular system care",
    icon: "stethoscope",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Skin, hair, and nail conditions",
    icon: "stethoscope",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents",
    icon: "stethoscope",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Musculoskeletal system treatment",
    icon: "stethoscope",
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain, nerves, and neurological disorders care",
    icon: "stethoscope",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Eye exams and vision treatment services",
    icon: "stethoscope",
  },
].map((spec) => {
  const doctorsCount = doctors.filter((d) => d.specialty === spec.name).length;
  const servicesCount = services.filter((s) => s.specialty === spec.name).length;

  return {
    ...spec,
    doctorsCount,
    servicesCount,
  };
});