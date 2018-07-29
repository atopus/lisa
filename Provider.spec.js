import * as fromProvider from './Provider';

describe("When there is no value", () => {

  xit('has no recorded values', () => {
    fromProvider.getValues('xxxx').then(value => 
      expect(value).toEqual(undefined)
    )
    
  });
})

describe("When there is a value", async () => {

  beforeEach(async () => {
    const res = await fromProvider.setValue('test', 'TEST');
    console.log(res ? "it worked" : "it did NOT work");
  })

  it('can record a new value', async () => {
    let result = await fromProvider.setValue('test', 'TEST WRITE')
    expect(result).toBeTruthy();

    let values = await fromProvider.getValues('test')
    expect(values).toEqual('TEST')
  });

  it('can record a new value', async () => {

    let values = await fromProvider.getValues('test')
    expect(values).toEqual('TEST')
      
  });
});