// ==========================================
// BÀI 1 & 2: Class Person và Student[cite: 1]
// ==========================================
class Person {
    constructor(public name: string, public age: number) {}
    display(): void { console.log(`Name: ${this.name}, Age: ${this.age}`); }
}
class Student extends Person {
    constructor(name: string, age: number, public grade: string) { super(name, age); }
    displayAllInfo(): void {
        this.display();
        console.log(`Grade: ${this.grade}`);
    }
}
console.log("--- Test Bài 1 & 2 ---");
const student1 = new Student("Vinh", 20, "A+");
student1.displayAllInfo();


// ==========================================
// BÀI 3: Class Car[cite: 1]
// ==========================================
class Car {
    constructor(public brand: string, public model: string, public year: number) {}
    showCarInfo(): void { console.log(`Car: ${this.brand} ${this.model} (${this.year})`); }
}
console.log("\n--- Test Bài 3 ---");
const myCar = new Car("VinFast", "VF8", 2024);
myCar.showCarInfo();


// ==========================================
// BÀI 4: Class Rectangle[cite: 1]
// ==========================================
class Rectangle {
    constructor(public width: number, public height: number) {}
    calculateArea(): number { return this.width * this.height; }
    calculatePerimeter(): number { return 2 * (this.width + this.height); }
}
console.log("\n--- Test Bài 4 ---");
const rect = new Rectangle(5, 10);
console.log(`Diện tích: ${rect.calculateArea()}, Chu vi: ${rect.calculatePerimeter()}`);


// ==========================================
// BÀI 5: Class BankAccount[cite: 1]
// ==========================================
class BankAccount {
    constructor(private balance: number = 0) {}
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Gửi thành công $${amount}. Số dư: $${this.balance}`);
        }
    }
    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Rút thành công $${amount}. Số dư: $${this.balance}`);
        } else {
            console.log("Số dư không đủ hoặc số tiền không hợp lệ.");
        }
    }
}
console.log("\n--- Test Bài 5 ---");
const myAccount = new BankAccount(500);
myAccount.deposit(200);
myAccount.withdraw(150);


// ==========================================
// BÀI 6: Lớp Book[cite: 1]
// ==========================================
class Book {
    constructor(public title: string, public author: string, public year: number) {}
}
console.log("\n--- Test Bài 6 ---");
const myBook = new Book("Design Patterns in TypeScript", "GoF", 2024);
console.log(`Sách: ${myBook.title} - Tác giả: ${myBook.author}`);


// ==========================================
// BÀI 7: Lớp User với private property[cite: 1]
// ==========================================
class User {
    private _name: string;
    constructor(name: string) { this._name = name; }
    get name(): string { return this._name; }
    set name(newName: string) {
        if (newName.length > 0) this._name = newName;
    }
}
console.log("\n--- Test Bài 7 ---");
const user1 = new User("TheWinH");
user1.name = "Vinh Đào"; // Kích hoạt setter
console.log(`Tên user hiện tại: ${user1.name}`); // Kích hoạt getter


// ==========================================
// BÀI 8: Lớp Product (sẽ được dùng lại ở Bài 26)[cite: 1]
// ==========================================
class Product {
    constructor(public name: string, public price: number) {}
}
console.log("\n--- Test Bài 8 ---");
const products: Product[] = [
    new Product("Chuột máy tính", 50),
    new Product("Bàn phím cơ", 150),
    new Product("Màn hình", 300)
];
const expensiveProducts = products.filter(p => p.price > 100);
console.log("Sản phẩm giá > 100:", expensiveProducts);


// ==========================================
// BÀI 9: Interface Animal (Chỉ là định nghĩa)[cite: 1]
// ==========================================
interface IAnimal {
    name: string;
    sound(): void;
}


// ==========================================
// BÀI 10: Lớp Account với public, private và readonly[cite: 1]
// ==========================================
class Account {
    public accountName: string;
    private balance: number;
    readonly accountNumber: string;
    constructor(name: string, balance: number, accNo: string) {
        this.accountName = name;
        this.balance = balance;
        this.accountNumber = accNo;
    }
}
console.log("\n--- Test Bài 10 ---");
const acc10 = new Account("Ngân hàng Sinh viên", 1000, "IUH-123456");
console.log(`Tài khoản: ${acc10.accountName}, Số TK (readonly): ${acc10.accountNumber}`);


// ==========================================
// BÀI 11: Base class Animal và kế thừa[cite: 1]
// ==========================================
class BaseAnimal {
    constructor(public name: string) {}
}
class Dog extends BaseAnimal {
    bark(): void { console.log(`${this.name} sủa: Gâu gâu!`); }
}
class Cat extends BaseAnimal {
    meow(): void { console.log(`${this.name} kêu: Meo meo!`); }
}
console.log("\n--- Test Bài 11 ---");
const myDog = new Dog("Milu");
myDog.bark();


// ==========================================
// BÀI 12: Interfaces Flyable và Swimmable[cite: 1]
// ==========================================
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }
class Bird implements Flyable {
    fly(): void { console.log("Chim đang bay trên trời..."); }
}
class Fish implements Swimmable {
    swim(): void { console.log("Cá đang bơi dưới nước..."); }
}
console.log("\n--- Test Bài 12 ---");
new Bird().fly();
new Fish().swim();


// ==========================================
// BÀI 13: Abstract class Shape[cite: 1]
// ==========================================
abstract class Shape {
    abstract area(): number;
}
class Square extends Shape {
    constructor(public side: number) { super(); }
    area(): number { return this.side * this.side; }
}
class Circle extends Shape {
    constructor(public radius: number) { super(); }
    area(): number { return Math.PI * this.radius * this.radius; }
}
console.log("\n--- Test Bài 13 ---");
console.log(`Diện tích hình vuông cạnh 5: ${new Square(5).area()}`);


// ==========================================
// BÀI 14: Kế thừa với phương thức riêng biệt[cite: 1]
// ==========================================
class Employee {
    constructor(public name: string, public salary: number) {}
}
class Manager extends Employee {
    manageTeam(): void { console.log(`${this.name} đang quản lý dự án.`); }
}
class Developer extends Employee {
    writeCode(): void { console.log(`${this.name} đang code Next.js và TypeScript.`); }
}
console.log("\n--- Test Bài 14 ---");
const dev = new Developer("Vinh", 2000);
dev.writeCode();


// ==========================================
// BÀI 15: Lớp Library[cite: 1]
// ==========================================
class Library {
    books: Book[] = [];
    users: User[] = [];
    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Đã thêm sách vào thư viện: ${book.title}`);
    }
}
console.log("\n--- Test Bài 15 ---");
const myLib = new Library();
myLib.addBook(myBook); // Tái sử dụng myBook từ Bài 6


// ==========================================
// BÀI 16: Generic class Box[cite: 1]
// ==========================================
class Box<T> {
    constructor(public value: T) {}
    getValue(): T { return this.value; }
}
console.log("\n--- Test Bài 16 ---");
const stringBox = new Box<string>("Học TypeScript thật thú vị");
console.log(`Giá trị Generic Box: ${stringBox.getValue()}`);


// ==========================================
// BÀI 17: Singleton Logger[cite: 1]
// ==========================================
class Logger {
    private static instance: Logger;
    private constructor() {} 
    public static getInstance(): Logger {
        if (!Logger.instance) Logger.instance = new Logger();
        return Logger.instance;
    }
    log(message: string): void { console.log(`[LOG]: ${message}`); }
}
console.log("\n--- Test Bài 17 ---");
Logger.getInstance().log("Hệ thống khởi động thành công!");


// ==========================================
// BÀI 18: Static class MathUtil[cite: 1]
// ==========================================
class MathUtil {
    static add(a: number, b: number): number { return a + b; }
    static subtract(a: number, b: number): number { return a - b; }
}
console.log("\n--- Test Bài 18 ---");
console.log(`5 + 10 = ${MathUtil.add(5, 10)}`);


// ==========================================
// BÀI 19 & 28: Đa hình (Animal28)[cite: 1]
// ==========================================
class Animal28 {
    protected makeSound(): void { console.log("Some generic sound"); }
    public speak(): void { this.makeSound(); }
}
class Dog28 extends Animal28 {
    protected makeSound(): void { console.log("Gâu gâu!"); }
}
class Cat28 extends Animal28 {
    protected makeSound(): void { console.log("Meo meo!"); }
}
console.log("\n--- Test Bài 19 & 28 ---");
const myCat28 = new Cat28();
myCat28.speak();


// ==========================================
// BÀI 20: Vehicle interface[cite: 1]
// ==========================================
interface Vehicle {
    speed: number;
    drive(): void;
}
class Car20 implements Vehicle {
    constructor(public speed: number) {}
    drive(): void { console.log(`Ô tô chạy với tốc độ ${this.speed} km/h`); }
}
class Bike implements Vehicle {
    constructor(public speed: number) {}
    drive(): void { console.log(`Xe đạp chạy với tốc độ ${this.speed} km/h`); }
}
console.log("\n--- Test Bài 20 ---");
new Car20(80).drive();


// ==========================================
// BÀI 21: Generic Repository[cite: 1]
// ==========================================
class Repository<T> {
    private items: T[] = [];
    add(item: T): void { this.items.push(item); }
    getAll(): T[] { return this.items; }
}
console.log("\n--- Test Bài 21 ---");
const techRepo = new Repository<string>();
techRepo.add("React"); techRepo.add("Next.js");
console.log("Danh sách Repo:", techRepo.getAll());


// ==========================================
// BÀI 22: Stack[cite: 1]
// ==========================================
class Stack<T> {
    private elements: T[] = [];
    push(item: T): void { this.elements.push(item); }
    pop(): T | undefined { return this.elements.pop(); }
}
console.log("\n--- Test Bài 22 ---");
const numberStack = new Stack<number>();
numberStack.push(1); numberStack.push(2);
console.log(`Lấy khỏi Stack: ${numberStack.pop()}`); // Mong đợi là 2


// ==========================================
// BÀI 23: Interface Payment[cite: 1]
// ==========================================
interface Payment { pay(amount: number): void; }
class CashPayment implements Payment {
    pay(amount: number): void { console.log(`Thanh toán ${amount} bằng Tiền mặt.`); }
}
console.log("\n--- Test Bài 23 ---");
new CashPayment().pay(500);


// ==========================================
// BÀI 24: Abstract class Appliance[cite: 1]
// ==========================================
abstract class Appliance { abstract turnOn(): void; }
class Fan extends Appliance { turnOn(): void { console.log("Quạt đã được bật."); } }
console.log("\n--- Test Bài 24 ---");
new Fan().turnOn();


// ==========================================
// BÀI 25: Class Shape với static method[cite: 1]
// ==========================================
class Shape25 {
    static describe(): void { console.log("Đây là một hình học cơ bản."); }
}
console.log("\n--- Test Bài 25 ---");
Shape25.describe();


// ==========================================
// BÀI 26: Class Order (Dùng lại Product Bài 8)[cite: 1]
// ==========================================
class Order {
    private products: Product[] = [];
    addProduct(p: Product) { this.products.push(p); }
    calculateTotalPrice(): number {
        return this.products.reduce((total, p) => total + p.price, 0);
    }
}
console.log("\n--- Test Bài 26 ---");
const myOrder = new Order();
myOrder.addProduct(new Product("Chuột", 50));
myOrder.addProduct(new Product("Bàn phím", 150));
console.log(`Tổng đơn hàng: $${myOrder.calculateTotalPrice()}`);


// ==========================================
// BÀI 27: Class Teacher (Dùng lại Person Bài 1)[cite: 1]
// ==========================================
class Teacher extends Person {
    constructor(name: string, age: number, public subject: string) {
        super(name, age);
    }
    introduce(): void {
        console.log(`Tôi là ${this.name}, giáo viên môn ${this.subject}.`);
    }
}
console.log("\n--- Test Bài 27 ---");
const myTeacher = new Teacher("Thầy A", 45, "Lập trình Web");
myTeacher.introduce();


// ==========================================
// BÀI 29: Interface Movable (Bài 28 đã gộp ở trên)[cite: 1]
// ==========================================
interface Movable { move(): void; }
class Robot implements Movable {
    move(): void { console.log("Robot đang di chuyển..."); }
}
console.log("\n--- Test Bài 29 ---");
new Robot().move();


// ==========================================
// BÀI 30: Class School (Dùng lại Teacher Bài 27 và Student Bài 2)[cite: 1]
// ==========================================
class School {
    teachers: Teacher[] = [];
    students: Student[] = [];
    addTeacher(t: Teacher) { this.teachers.push(t); }
    addStudent(s: Student) { this.students.push(s); }
    displayInfo(): void {
        console.log(`Trường IUH có: ${this.teachers.length} giáo viên, ${this.students.length} sinh viên.`);
    }
}
console.log("\n--- Test Bài 30 ---");
const uni = new School();
uni.addTeacher(myTeacher); // Tái sử dụng
uni.addStudent(student1);  // Tái sử dụng
uni.displayInfo();