package com.springboot.demo.exception;

public class AlreadyExistException extends Exception{
  private String message;

  public AlreadyExistException(String message) {
        super(message);
        this.message = message;
    }

  public AlreadyExistException() {
    }
  
}
