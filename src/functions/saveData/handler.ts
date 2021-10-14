import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
const {dynamoDB} = require('../../../src')
import schema from './schema';

const saveData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const params = {
      TableName: 'Customer', 
      Item: {
        CustomerName: event.body.CustomerName,
        // CustomerAddress: event.body.CustomerAddress
      }
    }
    const result = await save(params);
    return formatJSONResponse({
      message: result
    })
}


const save = (params) => {
return new Promise((resolve, reject) => {
  dynamoDB.putItem(params, function(error) {
    if (error) {
      reject(error)
    }
    else {
      resolve(params)
    }
  })
}) 

}

export const main = middyfy(saveData);
