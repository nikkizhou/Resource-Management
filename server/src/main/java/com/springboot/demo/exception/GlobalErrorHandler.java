package com.springboot.demo.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class GlobalErrorHandler {

  @ExceptionHandler(NotFoundException.class)
  @ResponseBody
  public ProblemDetail notFoundExceptionHandler(NotFoundException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    return problemDetail;
  }
  
  @ExceptionHandler(AlreadyExistException.class)
  public ProblemDetail alreadyExistExceptionHandler(AlreadyExistException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return problemDetail;
  }

  @ExceptionHandler(HasOverlapExeption.class)
  public ProblemDetail hasOverlapExceptionHandler(HasOverlapExeption ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return problemDetail;
  }

  @ExceptionHandler(DateOutOfRangeException.class)
  public ProblemDetail dateOutOfRangeExceptionHandler(DateOutOfRangeException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    return problemDetail;
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ProblemDetail methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {

    ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);

    ArrayList<String> validationErrors = new ArrayList<>();

    ex.getBindingResult()
        .getFieldErrors()
        .forEach(el -> validationErrors.add(el.getField()+" "+ el.getDefaultMessage()));

    problemDetail.setProperty("detail", validationErrors);

    return problemDetail;
  }

}
