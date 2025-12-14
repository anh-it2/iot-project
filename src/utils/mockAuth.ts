// Mock authentication data
export interface Company {
  email: string;
  password: string;
  company: string;
}

export const companies: Company[] = [
  {
    email: "admin@hoaphat.com.vn",
    password: "Qwerty123456",
    company: "hoaphat",
  },
  {
    email: "admin@tng.com.vn",
    password: "Qwerty123456",
    company: "tng",
  },
  {
    email: "admin@thanhcong.com.vn",
    password: "Qwerty123456",
    company: "thanhcong",
  },
  {
    email: "admin@vinatex.com.vn",
    password: "Qwerty123456",
    company: "vinatex",
  },
  {
    email: "admin@casumina.com.vn",
    password: "Qwerty123456",
    company: "casumina",
  },
  {
    email: "admin@vrg.com.vn",
    password: "Qwerty123456",
    company: "vrg",
  },
  {
    email: "admin@dtsvn.com.vn",
    password: "Qwerty123456",
    company: "dtsvn",
  },
  {
    email: "admin@vingroup.com.vn",
    password: "Qwerty123456",
    company: "vingroup",
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
