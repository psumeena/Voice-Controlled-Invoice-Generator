# Voice-Controlled-Invoice-Generator
A spring boot based web application that aids specially-abled people to generate invoice without any hassle
## Steps to run the project

### To import the project in Eclipse IDE follow the steps,

1) File->import->under general folder choose “Existing projects into workspace” and click Next.

 ![image](https://user-images.githubusercontent.com/82094868/162765817-3802e739-ae74-44fe-a21f-19d02b79a19c.png)

2) In “select archive file”, browse for the downloaded project zip file and check “vcig” under projects and click Finish.

 ![image](https://user-images.githubusercontent.com/82094868/162767128-676c359c-24f9-41f7-9b47-94d43e6c9e3f.png)

### Project structure:

![image](https://user-images.githubusercontent.com/82094868/162767195-dfbd3ba9-a617-45b0-8479-5cc8e68b4823.png)

### Prerequisites:

1) Download [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and create a Database by the name **“invoice”** and create two tables **“client”** and **“product”**

#### client table creation code:

` create table client(client_id serial primary key, client_name char(50), client_mail char(50) unique, client_address char(70), client_phone numeric); `

` insert into client(client_name, client_mail, client_address, client_phone) values ('Orbital corporation', 'orbital@gmail.com', 'Plot no. 123, Green Hills', 70007000); `

` insert into client(client_name, client_mail, client_address, client_phone) values ('Cyber corporation', 'cyber@gmail.com', 'Plot no. 277, Pearl Street', 90009000); `

` insert into client(client_name, client_mail, client_address, client_phone) values ('Melody private limited', 'melody@gmail.com', 'Plot no. 321, Redwood road', 80008000); `

` insert into client(client_name, client_mail, client_address, client_phone) values ('Bright Destiny limited', 'brightdestiny@gmail.com', 'Plot no. 772, Lake street', 10001000); `

` insert into client(client_name, client_mail, client_address, client_phone) values ('Mercury Solutions', 'mercurysolutions@gmail.com', 'Plot no. 777, Sage Avenue', 20002000); `

#### product table creation code:

` create table product(product_id serial primary key, product_name char(75), product_quantity numeric, "product_cost(Rupees)" numeric); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('printer paper',1,300); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('pen',1,10); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('file folder',1,50); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)" ) values ('notepad',1,25); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)" )values ('planner',1,200); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)" )values ('calender',1,100); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)" )values ('highlighter',1,25); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('whiteboard marker',1,30); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('paper clipboard',1,70); `

` insert into product (product_name, product_quantity, "product_cost(Rupees)" )values ('stickynotes',100,150); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('file cabinet',1,2000); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('binder clip',1,20); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('tape dispenser',1,100); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('glue stick',1,20); `

` insert into product(product_name, product_quantity, "product_cost(Rupees)")values('pen holder',1,150); `

2) Goto dataacess.java under com.tables.access and change the password (ps2717) with your PostgreSQL password and DB name (invoice) if applicable.
 
**DataAccess.java location**

![image](https://user-images.githubusercontent.com/82094868/162769091-de85f97b-fd4a-4ae5-8a49-1970d7b07a65.png)

![image](https://user-images.githubusercontent.com/82094868/162769274-20873038-46fc-4d4d-a2f6-653b2908289a.png)

3) Download [PostgreSQL JDBC driver jar](https://jdbc.postgresql.org/download/postgresql-42.2.11.jar) and add this to the project’s classpath. To do that,
Right click on the project “vcig”->Build Path->Configure build path->under libraries select Add External jars->Select the downloaded jar file ->Click Apply and Close.

 ![image](https://user-images.githubusercontent.com/82094868/162769311-7c459fb0-698b-49c9-88ca-9f98fa3acb84.png)

### To run the project,

1) Right click on the project “vcig”->Run As->Run Configurations…
 
![image](https://user-images.githubusercontent.com/82094868/162769372-8fd49612-8e25-4c89-bfff-3fc91f2cf663.png)

2) Double click on Maven Build and choose the project “vcig” in Base directory. In Goals, enter ` spring-boot:run ` then click Run button.

![image](https://user-images.githubusercontent.com/82094868/162769530-8fbacfe6-2daa-4f0d-8884-e0ce9fec2617.png)


3) On Successful run, the console will display the following,

![image](https://user-images.githubusercontent.com/82094868/162769560-6d051fb7-5625-47e2-b02b-023f3a46ce61.png)

### Project Demo:

 Open Chrome browser (only chrome), and enter the url (http://localhost:8080/first.html)
 
 ![image](https://user-images.githubusercontent.com/82094868/162769609-40e9c589-c9c0-4b1d-b91c-c61e40cb7935.png)

Say “For new client” to generate invoice for a new client or “For existing client” to generate invoice for an already existing client (registered in DB). Former will be redirected to Client registration page and latter will be redirected to invoice generating page.

#### Client registration page:

 ![image](https://user-images.githubusercontent.com/82094868/162769667-bdb284f4-3a82-48a3-b080-03cba6b78710.png)

After filling all the fields via voice, say “register client” to register the client in DB

#### Invoice generating page:

 ![image](https://user-images.githubusercontent.com/82094868/162769686-3c6e8379-f663-4d6a-b935-b47123e19b98.png)

After filling all the fields via voice, download and send mail to the client through the given voice commands.
