import * as fromProvider from './Provider';
import moment from 'moment';

const TODAY = moment().format('YYYYMMDD');

describe("When there is no value", () => {

  xit('has no recorded values', () => {
    fromProvider.getValues('xxxx').then(value => 
      expect(value).toEqual(undefined)
    )
    
  });
})

describe("When there is a value", async () => {

  beforeEach(async () => {
    const res = await fromProvider.setValue('test', TODAY, 'TEST');
    console.log(res ? "it worked" : "it did NOT work");
  })

  it('can record a new value', async () => {
    let result = await fromProvider.setValue('test', TODAY, 'TEST WRITE')
    expect(result).toBeTruthy();

    let values = await fromProvider.getValue('test', TODAY)
    expect(values).toEqual('TEST')
  });

  it('can record a new value', async () => {

    let values = await fromProvider.getValue('test', TODAY)
    expect(values).toEqual('TEST')
      
  });
});