package com.springboot.demo.exception;

public class DateOutOfRangeException extends Exception{
  public DateOutOfRangeException(String message) {
    super(message);
  }
}
