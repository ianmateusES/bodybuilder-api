interface ICreateUserDTO {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  telephone: string;
  user_type: string;
  professional_info_id?: string;
  address_id: string;
}

export { ICreateUserDTO };
