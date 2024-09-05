import { z } from "zod";

export const getCustomerProfileRequestSchema = z.object({
  accessToken: z
    .string({ message: "missing access token" })
    .startsWith("Bearer "),
});

export const getCustomerProfileConfigSchema = z.object({
  getCustomerProfileUrl: z
    .string({
      message:
        "ENDPOINT_GET_CUSTOMER_PROFILE is not defined in environment variable",
    })
    .url({ message: "ENDPOINT_GET_CUSTOMER_PROFILE is not a valid URL" }),
});

export type GetCustomerProfileConfig = z.infer<
  typeof getCustomerProfileConfigSchema
>;
export type GetCustomerProfileRequest = z.infer<
  typeof getCustomerProfileRequestSchema
>;
export type GetCustomerProfileResponse = {
  code: string;
  message: string;
  data?: CustomerProfile;
};

export type CustomerProfile = {
  birthDate?: string;
  cid?: string;
  email?: string;
  fullNameEn?: FullNameEn;
  fullNameTh?: FullNameTh;
  gender?: string;
  legalAddress?: LegalAddress;
  mailingAddress?: MailingAddress;
  mobileNo?: string;
  officeAddress?: OfficeAddress;
  title?: string;
  workProfile?: WorkProfile;
};

type FullNameEn = {
  engFirstName: string;
  engLastName: string;
  engMiddleName: string;
};

type FullNameTh = {
  thaiFirstName: string;
  thaiLastName: string;
  thaiMiddleName: string;
};

type LegalAddress = {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
};

type MailingAddress = {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
};

type OfficeAddress = {
  address: string;
  country: string;
  district: string;
  districtCode: string;
  officeName: string;
  phoneExt: string;
  phoneNo: string;
  postalCode: string;
  stateProv: string;
  stateProvCode: string;
  subDistrict: string;
  subDistrictCode: string;
};

type WorkProfile = {
  occupationCode: string;
  occupationGroup: string;
  occupationGroupValue: string;
  occupationValue: string;
  salary: string;
  salaryValue: string;
  subOccupationGroup: string;
  subOccupationGroupValue: string;
};
