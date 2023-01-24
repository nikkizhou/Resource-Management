# resource-management

## How to start:
1. Clone this repository.
2. Install maven and Java JDK.
3. Go to server directory, run:  **mvn spring-boot:run**
4. Go to client directory, run: **npm install**    
  after everything installed, run:  **npm run start**
  

## Motivation
This ia an app for people to assign tasks to different employees depending on their positions.

## Functions:
1. **Get, create, update and delete** employees/positions/tasks
2. **Filter, search and sort** based on id/name/and date

## Validating
1. Throws **NotFoundException** when trying getById/updating/deleting an item with the id that doesn't exist in the system.  
2. Throws **AlreadyExistException** when trying adding an item with an id that already exists in the system.  
3. Throws **HasOverlapException** when trying adding a position to an employee with a period that's not available for the employee.  
4. Throws **DateOutOfRangeException** when trying adding a task to  an employee with a date that's out of the period range of all positions the employee has.  
5. Auto validate with **@NotNull, @NotBlank, @JsonFormat** annotation from Spring Boot.  

## Tech stack
Frontend: **React, Typescript, Material-table**    
Backend: **Java, Spring Boot**   


## Learnings  
1. **Make a plan**, list everything needed to do, give them priority level according to my situation.
2. Always **make a mvp** first before diving to more features.

## Challenges  
1. Material-table is a very powerful package, but in the same time, it brings som inconvience too when we need to customize som features. Ant it takes longer time to debug since many things are hidden.


## Future features  
1. !! Multiple Date Picker for selecting period  
2. !! Databese (MySQL)  
3. ?? Writing testing for backend  
4. ?? Authentication  
5. ?? Pictures for employees

## References:
1. Spring boot CRUD: https://www.youtube.com/watch?v=QuvS_VLbGko
2. Material-table: https://material-table.com/#/

