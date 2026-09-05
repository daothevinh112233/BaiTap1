// ==========================================
// HÀM TIỆN ÍCH DÙNG CHUNG
// ==========================================
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const simulateTask = (time: number): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve(`Task done in ${time}ms`), time));
}; // Dùng cho Bài 5, 6, 7, 12, 17, 28, 29, 30

// ==========================================
// A. BASICS WITH PROMISE[cite: 1]
// ==========================================

// Bài 1 & 11: Promise 2s
const ex1 = () => new Promise<string>(resolve => setTimeout(() => resolve("Hello Async"), 2000));

// Bài 2: Promise trả về 10 sau 1s
const ex2 = (): Promise<number> => new Promise(resolve => setTimeout(() => resolve(10), 1000));

// Bài 3: Promise reject lỗi sau 1s
const ex3 = (): Promise<never> => new Promise((_, reject) => setTimeout(() => reject("Something went wrong"), 1000));

// Bài 4: Random number với then/catch
const ex4 = () => {
    new Promise<number>((resolve, reject) => {
        const num = Math.random();
        num > 0.5 ? resolve(num) : reject(new Error("Number too small"));
    })
    .then(res => console.log(`Bài 4 - Success: ${res.toFixed(2)}`))
    .catch(err => console.log(`Bài 4 - Failed: ${err.message}`));
};

// Bài 6 & 7: Promise.all và Promise.race
const ex6 = () => Promise.all([simulateTask(100), simulateTask(200), simulateTask(300)]);
const ex7 = () => Promise.race([simulateTask(150), simulateTask(100), simulateTask(250)]);

// Bài 8: Promise chain (2^2 -> *2 -> +5)
const ex8 = () => {
    Promise.resolve(2)
        .then(n => n * n)
        .then(n => n * 2)
        .then(n => n + 5)
        .then(res => console.log(`Bài 8 - Kết quả chuỗi: ${res}`)); // 13
};

// Bài 9: Đọc mảng và lọc số chẵn sau 1s
const ex9 = () => {
    new Promise<number[]>(resolve => setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 1000))
        .then(arr => arr.filter(n => n % 2 === 0))
        .then(res => console.log(`Bài 9 - Số chẵn: ${res}`));
};

// Bài 10: Dùng finally
const ex10 = () => {
    simulateTask(500).finally(() => console.log("Bài 10 - Done (từ block finally)"));
};

// ==========================================
// B. ASYNC/AWAIT[cite: 1]
// ==========================================

// Bài 12: Gọi simulateTask bằng async/await
const ex12 = async () => {
    const result = await simulateTask(2000);
    console.log(`Bài 12 - ${result}`);
};

// Bài 13: try/catch với async/await
const ex13 = async () => {
    try { await ex3(); } 
    catch (error) { console.log(`Bài 13 - Bắt lỗi: ${error}`); }
};

// Bài 14: Nhận 1 số, đợi 1s, nhân 3
const ex14 = async (num: number): Promise<number> => {
    await delay(1000);
    return num * 3;
};

// Bài 17: for await... of
const ex17 = async () => {
    const promises = [simulateTask(100), simulateTask(200)];
    for await (const result of promises) {
        console.log(`Bài 17 - Đã duyệt: ${result}`);
    }
};

// Bài 18, 19, 20: Giả lập API call
interface User { id: number; name: string; university: string; }
const fetchUser = async (id: number): Promise<User> => {
    await delay(1000);
    return { id, name: "Vinh Đào", university: "IUH" };
};

const fetchUsers = async (ids: number[]) => {
    for (const id of ids) {
        const user = await fetchUser(id);
        console.log(`Bài 19 - Fetched User:`, user);
    }
};

const ex20 = async (id: number) => {
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject("Timeout Error!"), 2000));
    try {
        const result = await Promise.race([fetchUser(id), timeout]);
        console.log("Bài 20 - API Success:", result);
    } catch (error) {
        console.log("Bài 20 - API Failed:", error);
    }
};

// ==========================================
// C. FETCH API & SIMULATED I/O[cite: 1]
// ==========================================

// Bài 21 & 23: Fetch API và lọc todo chưa hoàn thành
const ex21_23 = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: any[] = await res.json();
    const incomplete = todos.filter(t => !t.completed).slice(0, 2); 
    console.log("Bài 23 - Todos chưa hoàn thành:", incomplete);
};

// Bài 22: Gọi API nhiều lần
const ex22 = async () => {
    const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
    for (const url of urls) {
        const res = await fetch(url);
        const data = await res.json();
        console.log(`Bài 22 - Fetched ID ${data.id}: ${data.title}`);
    }
};

// Bài 24: POST request
const postData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test POST', body: 'Dữ liệu mẫu', userId: 1 }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    console.log("Bài 24 - POST thành công:", await res.json());
};

// Bài 25: Mô phỏng tải file 3 giây
const downloadFile = async () => {
    console.log("Bài 25 - Bắt đầu tải file (đợi 3s)...");
    await delay(3000);
    console.log("Bài 25 - Đã tải xong file!");
};

// Bài 26: Đợi 5 giây
const ex26 = async () => {
    console.log("Bài 26 - Đang mô phỏng đợi 5 giây...");
    await delay(5000);
    console.log("Bài 26 - Đã xong 5 giây!");
};

// Bài 27: Hàm thử lại khi lỗi
const fetchWithRetry = async (url: string, retries: number): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Lỗi API");
            return await res.json();
        } catch (err) {
            console.log(`Bài 27 - Retry lần ${i + 1} thất bại...`);
            if (i === retries - 1) throw err;
            await delay(1000);
        }
    }
};

// Bài 28: Xử lý 5 tác vụ song song
const batchProcess = async () => {
    const tasks = [simulateTask(100), simulateTask(200), simulateTask(300), simulateTask(400), simulateTask(500)];
    const results = await Promise.all(tasks);
    console.log("Bài 28 - Batch process kết quả (chạy song song):", results);
};

// Bài 29: Xử lý hàng đợi tuần tự
const queueProcess = async () => {
    const times = [100, 200]; 
    for (const time of times) {
        const res = await simulateTask(time);
        console.log(`Bài 29 - Queue processed (tuần tự): ${res}`);
    }
};

// Bài 30: Promise.allSettled
const ex30 = async () => {
    const results = await Promise.allSettled([fetchUser(1), ex3(), simulateTask(500)]);
    console.log("Bài 30 - Trạng thái của các Promise:");
    results.forEach((res, index) => console.log(`   - Task ${index + 1}: ${res.status}`));
};

// ==========================================
// HÀM CHẠY KIỂM TRA CHÍNH (MAIN RUNNER)
// ==========================================
const runAllTests = async () => {
    console.log("--- BẮT ĐẦU CHẠY BÀI TẬP TUẦN 2 ---");
    
    console.log(`Bài 1 - ${await ex1()}`);
    console.log(`Bài 2 - Promise trả về: ${await ex2()}`);
    ex4();
    console.log("Bài 6 (Promise.all):", await ex6());
    console.log("Bài 7 (Promise.race):", await ex7());
    ex8();
    ex9();
    ex10();
    
    await ex12();
    await ex13();
    
    console.log("Bài 15 - Chạy tuần tự (nhân 3):", await ex14(1), "và", await ex14(2));
    console.log("Bài 16 - Chạy song song (Promise.all):", await Promise.all([ex14(1), ex14(2)]));
    
    await ex17();
    await fetchUsers([101]);
    await ex20(999);
    
    await ex21_23();
    await ex22();
    await postData();
    
    await downloadFile(); // Bài 25
    await ex26();
    
    try { await fetchWithRetry('https://api-loi-co-tinh.com', 3); } 
    catch (e) { console.log("Bài 27 - Ngừng thử lại vì đã hết số lần cho phép."); }

    await batchProcess(); // Bài 28
    await queueProcess(); // Bài 29
    await ex30();

    console.log("\nHOÀN THÀNH TOÀN BỘ 30 BÀI TẬP!");
};

// Kích hoạt chạy toàn bộ
runAllTests();