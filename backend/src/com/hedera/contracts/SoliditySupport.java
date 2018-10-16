package com.hedera.contracts;

import java.math.BigInteger;

import org.ethereum.core.CallTransaction;
import org.ethereum.solidity.SolidityType;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.generated.Bytes32;

public final class SoliditySupport {
	// support for smart contract functions
	public static CallTransaction.Function getGetValueFunction(String getABI) {
		  String funcJson = getABI.replaceAll("'", "\"");
		  CallTransaction.Function function = CallTransaction.Function.fromJsonInterface(funcJson);
		  return function;
	 }
	public static CallTransaction.Function getSetFunction(String setABI) {
		  String funcJson = setABI.replaceAll("'", "\"");
		  CallTransaction.Function function = CallTransaction.Function.fromJsonInterface(funcJson);
		  return function;
	 }
	public static byte[] encodeGetValue(String getABI) {
		  CallTransaction.Function function = getGetValueFunction(getABI);
		  byte[] encodedFunc = function.encode();
		  return encodedFunc;
	 }


	public static byte[] encodeSet(long valueToAdd, String setABI) {
		  CallTransaction.Function function = getSetFunction(setABI);
		  byte[] encodedFunc = function.encode(valueToAdd);

		  return encodedFunc;
	 }

	public static byte[] encodeSet(byte[] valueToAdd, String setABI) {
		  CallTransaction.Function function = getSetFunction(setABI);
		  byte[] encodedFunc = function.encode(valueToAdd);

		  return encodedFunc;
	 }

    public static byte[] encodeSet(byte[] valueToAdd, byte[] hash, String setABI) {
        CallTransaction.Function function = getSetFunction(setABI);
        byte[] encodedFunc = function.encodeArguments(valueToAdd, hash);

        return encodedFunc;
    }



	public static int decodeGetValueResult(byte[] value, String getABI) {
		  int decodedReturnedValue = 0;
		  CallTransaction.Function function = getGetValueFunction(getABI);
		  Object[] retResults = function.decodeResult(value);
		  if (retResults != null && retResults.length > 0) {
				BigInteger retBi = (BigInteger) retResults[0];
				decodedReturnedValue = retBi.intValue();
		  }
		  return decodedReturnedValue;
	 }

}
