const { expect } = require('chai')

const convertToBoolean = require('./convertToBoolean')

describe('convertToBoolean', () => {
  it('converts null to false', () => expect(convertToBoolean(null)).to.be.equal(false))
  it('converts undefined to false', () => expect(convertToBoolean(undefined)).to.be.equal(false))
  it('converts false to false', () => expect(convertToBoolean(false)).to.be.equal(false))
  it('converts "false" to false', () => expect(convertToBoolean('false')).to.be.equal(false))
  it('converts other values to true', () => expect(convertToBoolean({})).to.be.equal(true))
})
