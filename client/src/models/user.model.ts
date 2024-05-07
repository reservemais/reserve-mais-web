export type userModel = {
  id: number;
  value: number;
  name: string;
  email: string;
  type: string;
  responsible?: string;
  isAdmin?: boolean;
  electronicIdentification?: string;
};

export type userApiModel = {
  id: number;
  blocked: boolean;
  code: string;
  confirmed: boolean;
  createdAt: string;
  electronicIdentification?: string;
  email: string;
  isAdmin?: boolean;
  password?: string;
  provider: string;
  type: string;
  updatedAt: string;
  username: string;
  responsibleId?: {
    id: number;
    blocked: boolean;
    code: string;
    confirmed: boolean;
    createdAt: string;
    electronicIdentification?: string;
    email: string;
    isAdmin?: boolean;
    provider: string;
    type: string;
    updatedAt: string;
    username: string;
  };
};

export type responsibleAndRequesterModel = {
  id: number;
  attributes: {
    blocked: boolean;
    code: string;
    confirmed: boolean;
    createdAt: string;
    electronicIdentification?: string;
    isAdmin?: boolean;
    email: string;
    provider: string;
    type: string;
    updatedAt: string;
    username: string;
    responsibleId?: {
      data: {
        id: number;
        attributes: {
          blocked: boolean;
          code: string;
          confirmed: boolean;
          createdAt: string;
          electronicIdentification?: string;
          email: string;
          provider: string;
          type: string;
          updatedAt: string;
          username: string;
        };
      };
    };
    role?: {
      data: {
        id: number;
        attributes: {
          createdAt: string;
          description: string;
          name: string;
          type: string;
          updatedAt: string;
        };
      };
    };
  };
};
