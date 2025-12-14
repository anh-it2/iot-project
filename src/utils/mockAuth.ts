// Mock authentication data
export interface Company {
  email: string;
  password: string;
  company: string;
}

export const companies: Company[] = [
  {
    email: "student1@example.com",
    password: "Student@123",
    company: "student 1",
  },
  {
    email: "student2@example.com",
    password: "Student@123",
    company: "student 2",
  },
  {
    email: "student3@example.com",
    password: "Student@123",
    company: "student 3",
  },
  {
    email: "student4@example.com",
    password: "Student@123",
    company: "student 4",
  },
  {
    email: "student5@example.com",
    password: "Student@123",
    company: "student 5",
  },
  {
    email: "student6@example.com",
    password: "Student@123",
    company: "student 6",
  },
  {
    email: "student7@example.com",
    password: "Student@123",
    company: "student 7",
  },
  {
    email: "student8@example.com",
    password: "Student@123",
    company: "student 8",
  },
];

// Mock authentication function
export const authenticateUser = (
  email: string,
  password: string
): Company | null => {
  const user = companies.find(
    (company) => company.email === email && company.password === password
  );
  return user || null;
};

// Get company info by email
export const getCompanyByEmail = (email: string): Company | null => {
  return companies.find((company) => company.email === email) || null;
};
