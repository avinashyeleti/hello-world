import _ from 'lodash';
import { validateProviderBasicInfo } from '../validators/provider';
import dummyProviders from '../fixtures/providers';

// eslint-disable-next-line import/prefer-default-export
export const post = async (req, res, next) => {
  try {
    const providerService = req.app.get('providerService');
    const result = await validateProviderBasicInfo(req.body);
    if (result.isValid) {
      const provider = await providerService.create(req.body);
      res.status(201).json(provider);
    } else {
      res.status(400).send({ message: result.message });
    }
  } catch (err) {
    res.status(500).send();
  }
};

export const getProviderById = async (req, res, next) => {
  try {
    const providerId = req.swagger.params.providerId.value;
    const providerService = req.app.get('providerService');
    const provider = await providerService.getProviderById(providerId);
    if (provider === null) {
      res
        .status(404)
        .send({ message: `Could not find provider with id ${providerId}` });
    } else {
      res.status(200).json(provider.dataValues);
    }
  } catch (err) {
    console.log(`This is wrong.. ${err}`);
    res.status(500).send({ message: 'error' });
  }
};

const lower = string => string.toLowerCase();

export const getProviders = async (req, res, next) => {
  try {
    const {
      providerName,
      providerTypeId,
      iqiesId,
      ccnId,
      address,
      city,
      stateId,
      createdUserId,
      sortBy,
    } = req.swagger.params;

    // filters are temporary placeholders for Sequelize until the DB is ready
    let tempProviders = _.cloneDeep(dummyProviders);

    if (providerName.value) {
      tempProviders = _.filter(tempProviders, provider =>
        lower(provider.providerName).includes(lower(providerName.value)),
      );
    }

    if (providerTypeId.value) {
      tempProviders = _.filter(tempProviders, {
        providerTypeId: req.swagger.params.providerTypeId.value,
      });
    }

    if (iqiesId.value) {
      tempProviders = _.filter(tempProviders, {
        iqiesId: req.swagger.params.iqiesId.value,
      });
    }

    if (ccnId.value) {
      tempProviders = _.filter(tempProviders, {
        ccnId: req.swagger.params.ccnId.value,
      });
    }

    if (address.value) {
      tempProviders = _.filter(tempProviders, provider =>
        lower(provider.providerAddress.addressLine1).includes(
          lower(address.value),
        ),
      );
    }

    if (city.value) {
      tempProviders = _.filter(tempProviders, provider =>
        lower(provider.providerAddress.city).includes(lower(city.value)),
      );
    }

    if (stateId.value) {
      tempProviders = _.filter(tempProviders, {
        stateId: req.swagger.params.stateId.value,
      });
    }

    if (createdUserId.value) {
      tempProviders = _.filter(tempProviders, {
        createdUserId: req.swagger.params.createdUserId.value,
      });
    }

    if (sortBy.value) {
      tempProviders = _.sortBy(tempProviders, [sortBy.value]);
    }

    res.status(200).json(tempProviders);
  } catch (err) {
    res.status(500).send();
  }
};
