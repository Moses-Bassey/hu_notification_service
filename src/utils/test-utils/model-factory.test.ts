/* eslint-disable @typescript-eslint/ban-types */

import { getModelToken } from '@nestjs/sequelize';

export interface ModelMockOverrides {
  findAll?: Function;
  create?: Function;
}

const model_mocks_override = (override?: ModelMockOverrides) => {
  const mocked_model = {};
  if (override) {
    Object.keys(override).forEach((key) => {
      mocked_model[key] = override[key];
    });
  }
  return mocked_model;
};

export const create_model = (
  entity: Function,
  overrides?: ModelMockOverrides,
) => {
  const mocked_model = model_mocks_override(overrides);
  return {
    provide: getModelToken(entity),
    useValue: mocked_model,
  };
};
