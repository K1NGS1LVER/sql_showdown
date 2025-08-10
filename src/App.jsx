import React, { useState } from 'react';

// --- Slide Data ---
// An array of objects, where each object represents a slide.
const slidesData = [
  // Slide 0: Title
  {
    type: 'title',
    title: 'Advanced SQL Concepts Quiz',
    subtitle: 'Moving Beyond CRUD Operations',
  },
  // Slide 1: Introduction
  {
    type: 'content',
    title: 'Introduction',
    content: [
      "Welcome! Today we're going to test our understanding of some more advanced SQL concepts.",
      "We'll look at questions involving subqueries, set operations, window functions, and more.",
      "For each question, try to come up with the SQL query to get the correct answer.",
      "We'll then discuss the solution, the underlying concept, and alternative approaches.",
    ],
  },
  // Slide 2: MySQL Setup
  {
    type: 'setup',
    title: 'MySQL Setup: Run These Queries First!',
    setupCode: `
-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS Sales, Website_Visits, Orders, Customers, OldEmployees, NewEmployees, Employees, Departments, Products;

-- Create and Insert for Q1, Q5
CREATE TABLE Departments (DeptID INT PRIMARY KEY, DeptName VARCHAR(50));
INSERT INTO Departments (DeptID, DeptName) VALUES (10, 'HR'), (20, 'IT'), (30, 'Sales');

CREATE TABLE Employees (EmployeeID INT PRIMARY KEY, Name VARCHAR(50), Department VARCHAR(50), Salary INT, DeptID INT, FOREIGN KEY (DeptID) REFERENCES Departments(DeptID));
INSERT INTO Employees (EmployeeID, Name, Department, Salary, DeptID) VALUES
(1, 'Alice', 'HR', 60000, 10), (2, 'Bob', 'IT', 80000, 20), (3, 'Charlie', 'IT', 75000, 20),
(4, 'David', 'HR', 62000, 10), (5, 'Eve', 'Sales', 90000, 30), (6, 'Frank', 'Sales', 85000, 30),
(7, 'Grace', 'IT', 82000, 20);
UPDATE Employees SET DeptID = 20 WHERE Name = 'Frank'; -- Correction from previous logic

-- Create and Insert for Q2, Q6
CREATE TABLE Products (ProductID INT PRIMARY KEY, ProductName VARCHAR(50), Category VARCHAR(50), Price INT);
INSERT INTO Products (ProductID, ProductName, Category, Price) VALUES
(1, 'Laptop', 'Electronics', 1200), (2, 'Mouse', 'Electronics', 25), (3, 'T-shirt', 'Apparel', 20),
(4, 'Jeans', 'Apparel', 50), (5, 'Keyboard', 'Electronics', 75);

CREATE TABLE Sales (SaleID INT PRIMARY KEY, ProductID INT, QuantitySold INT, FOREIGN KEY (ProductID) REFERENCES Products(ProductID));
INSERT INTO Sales (SaleID, ProductID, QuantitySold) VALUES (1, 1, 5), (2, 2, 50), (3, 1, 3), (4, 3, 20), (5, 2, 30);

-- Create and Insert for Q3
CREATE TABLE OldEmployees (EmployeeID INT PRIMARY KEY, Name VARCHAR(50));
INSERT INTO OldEmployees (EmployeeID, Name) VALUES (1, 'Alice'), (2, 'Bob');
CREATE TABLE NewEmployees (EmployeeID INT PRIMARY KEY, Name VARCHAR(50));
INSERT INTO NewEmployees (EmployeeID, Name) VALUES (3, 'Charlie'), (4, 'David');

-- Create and Insert for Q4, Q8, Q9
CREATE TABLE Customers (CustomerID INT PRIMARY KEY, Name VARCHAR(50));
INSERT INTO Customers (CustomerID, Name) VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie');

CREATE TABLE Orders (OrderID INT PRIMARY KEY, CustomerID INT, OrderDate DATE, Amount DECIMAL(10, 2), Status VARCHAR(50));
INSERT INTO Orders (OrderID, CustomerID, OrderDate, Amount, Status) VALUES
(1, 1, '2023-01-15', 100.00, 'Shipped'), (2, 3, '2023-01-16', 150.00, 'Processing'),
(3, 1, '2023-02-10', 200.00, 'Shipped'), (4, 1, '2023-02-12', 50.00, 'Pending'),
(5, 3, '2023-03-05', 300.00, 'Delivered');

-- Create and Insert for Q7
CREATE TABLE Website_Visits (VisitID INT PRIMARY KEY, UserID INT, VisitTimestamp DATETIME);
INSERT INTO Website_Visits (VisitID, UserID, VisitTimestamp) VALUES
(1, 101, '2023-10-01 09:00:00'), (2, 102, '2023-10-01 09:05:00'), (3, 101, '2023-10-01 09:10:00'),
(4, 101, '2023-10-01 09:25:00'), (5, 102, '2023-10-01 09:30:00');
    `,
  },
  // --- Question 1 ---
  {
    type: 'question',
    title: 'Question 1: Finding the Nth Highest Value',
    concept: 'Using ORDER BY, LIMIT, and OFFSET',
    question: 'Write a SQL query to find the employee with the third highest salary.',
    sampleTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">EmployeeID</th><th className="p-2 border">Name</th><th className="p-2 border">Department</th><th className="p-2 border">Salary</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">1</td><td className="p-2 border">Alice</td><td className="p-2 border">HR</td><td className="p-2 border">60000</td></tr>
          <tr><td className="p-2 border">2</td><td className="p-2 border">Bob</td><td className="p-2 border">IT</td><td className="p-2 border">80000</td></tr>
          <tr><td className="p-2 border">3</td><td className="p-2 border">Charlie</td><td className="p-2 border">IT</td><td className="p-2 border">75000</td></tr>
          <tr><td className="p-2 border">4</td><td className="p-2 border">David</td><td className="p-2 border">HR</td><td className="p-2 border">62000</td></tr>
          <tr><td className="p-2 border">5</td><td className="p-2 border">Eve</td><td className="p-2 border">Sales</td><td className="p-2 border">90000</td></tr>
          <tr><td className="p-2 border">6</td><td className="p-2 border">Frank</td><td className="p-2 border">Sales</td><td className="p-2 border">85000</td></tr>
          <tr><td className="p-2 border">7</td><td className="p-2 border">Grace</td><td className="p-2 border">IT</td><td className="p-2 border">82000</td></tr>
        </tbody>
      </table>
    `,
    answerQuery: 'SELECT * FROM Employees ORDER BY Salary DESC LIMIT 1 OFFSET 2;',
    answerTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">EmployeeID</th><th className="p-2 border">Name</th><th className="p-2 border">Department</th><th className="p-2 border">Salary</th><th className="p-2 border">DeptID</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">7</td><td className="p-2 border">Grace</td><td className="p-2 border">IT</td><td className="p-2 border">82000</td><td className="p-2 border">20</td></tr>
        </tbody>
      </table>
    `,
    alternatives: [
      {
        title: 'Using a Correlated Subquery:',
        query: `SELECT * FROM Employees E1 WHERE 2 = (SELECT COUNT(DISTINCT E2.Salary) FROM Employees E2 WHERE E2.Salary > E1.Salary);`
      },
      {
        title: 'Using a Window Function (DENSE_RANK):',
        query: `WITH RankedSalaries AS (SELECT *, DENSE_RANK() OVER (ORDER BY Salary DESC) as salary_rank FROM Employees) SELECT * FROM RankedSalaries WHERE salary_rank = 3;`
      }
    ],
    followUp: [
      'How would you find the employee with the lowest salary?',
      'What if you wanted to find the top three highest-paid employees?',
      'How does DENSE_RANK() differ from RANK() when handling ties in salary?'
    ]
  },
  // --- Question 2 ---
  {
    type: 'question',
    title: 'Question 2: Subqueries in the WHERE Clause',
    concept: 'Using a subquery to filter based on an aggregate value.',
    question: "Write a SQL query to find all products in the 'Electronics' category that are more expensive than the average price of all products.",
    sampleTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">ProductID</th><th className="p-2 border">ProductName</th><th className="p-2 border">Category</th><th className="p-2 border">Price</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">1</td><td className="p-2 border">Laptop</td><td className="p-2 border">Electronics</td><td className="p-2 border">1200</td></tr>
          <tr><td className="p-2 border">2</td><td className="p-2 border">Mouse</td><td className="p-2 border">Electronics</td><td className="p-2 border">25</td></tr>
          <tr><td className="p-2 border">3</td><td className="p-2 border">T-shirt</td><td className="p-2 border">Apparel</td><td className="p-2 border">20</td></tr>
          <tr><td className="p-2 border">4</td><td className="p-2 border">Jeans</td><td className="p-2 border">Apparel</td><td className="p-2 border">50</td></tr>
          <tr><td className="p-2 border">5</td><td className="p-2 border">Keyboard</td><td className="p-2 border">Electronics</td><td className="p-2 border">75</td></tr>
        </tbody>
      </table>
    `,
    answerQuery: "SELECT * FROM Products WHERE Category = 'Electronics' AND Price > (SELECT AVG(Price) FROM Products);",
    answerTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">ProductID</th><th className="p-2 border">ProductName</th><th className="p-2 border">Category</th><th className="p-2 border">Price</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">1</td><td className="p-2 border">Laptop</td><td className="p-2 border">Electronics</td><td className="p-2 border">1200</td></tr>
        </tbody>
      </table>
    `,
    alternatives: [
      {
        title: 'Using a Common Table Expression (CTE):',
        query: `WITH AvgPrice AS (SELECT AVG(Price) as avg_price FROM Products) SELECT * FROM Products, AvgPrice WHERE Category = 'Electronics' AND Price > avg_price;`
      }
    ],
    followUp: [
      'How would you find products that are cheaper than the average price?',
      "What if you wanted to find products in the 'Apparel' category that are more expensive than the most expensive 'Electronics' product?",
      'Can you write a query to find all products that have a price higher than the average price of products in their own category?'
    ]
  },
  // --- Question 3 ---
  {
    type: 'question',
    title: 'Question 3: Combining Results with UNION',
    concept: 'Combining result sets from multiple queries.',
    question: 'Write a SQL query to create a single list of all employee names from both the OldEmployees and NewEmployees tables.',
    sampleTable: `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">OldEmployees</h4>
          <table className="w-full text-left border-collapse">
            <thead><tr><th className="p-2 border">EmployeeID</th><th className="p-2 border">Name</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border">1</td><td className="p-2 border">Alice</td></tr>
              <tr><td className="p-2 border">2</td><td className="p-2 border">Bob</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-semibold mb-2">NewEmployees</h4>
          <table className="w-full text-left border-collapse">
            <thead><tr><th className="p-2 border">EmployeeID</th><th className="p-2 border">Name</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border">3</td><td className="p-2 border">Charlie</td></tr>
              <tr><td className="p-2 border">4</td><td className="p-2 border">David</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    answerQuery: 'SELECT Name FROM OldEmployees UNION SELECT Name FROM NewEmployees;',
    answerTable: `
      <table className="w-full text-left border-collapse max-w-xs">
        <thead><tr><th className="p-2 border">Name</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">Alice</td></tr>
          <tr><td className="p-2 border">Bob</td></tr>
          <tr><td className="p-2 border">Charlie</td></tr>
          <tr><td className="p-2 border">David</td></tr>
        </tbody>
      </table>
    `,
    alternatives: [
      {
        title: 'Using UNION ALL (keeps duplicates):',
        query: 'SELECT Name FROM OldEmployees UNION ALL SELECT Name FROM NewEmployees;'
      }
    ],
    followUp: [
      'What is the difference between UNION and UNION ALL?',
      'What happens if the two tables have a different number of columns or different data types?',
      "How would you combine the results if one table had an extra column, for example, 'HireDate'?"
    ]
  },
    // --- Question 4 ---
  {
    type: 'question',
    title: 'Question 4: Filtering Aggregated Data with HAVING',
    concept: 'Filtering groups after aggregation.',
    question: 'Write a query to find the names of departments that have more than two employees.',
    sampleTable: `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Employees</h4>
          <table className="w-full text-left border-collapse">
            <thead><tr><th className="p-2 border">Name</th><th className="p-2 border">DeptID</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border">Alice</td><td className="p-2 border">10</td></tr>
              <tr><td className="p-2 border">Bob</td><td className="p-2 border">20</td></tr>
              <tr><td className="p-2 border">Charlie</td><td className="p-2 border">20</td></tr>
              <tr><td className="p-2 border">David</td><td className="p-2 border">10</td></tr>
              <tr><td className="p-2 border">Eve</td><td className="p-2 border">30</td></tr>
              <tr><td className="p-2 border">Frank</td><td className="p-2 border">20</td></tr>
              <tr><td className="p-2 border">Grace</td><td className="p-2 border">20</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Departments</h4>
          <table className="w-full text-left border-collapse">
            <thead><tr><th className="p-2 border">DeptID</th><th className="p-2 border">DeptName</th></tr></thead>
            <tbody>
              <tr><td className="p-2 border">10</td><td className="p-2 border">HR</td></tr>
              <tr><td className="p-2 border">20</td><td className="p-2 border">IT</td></tr>
              <tr><td className="p-2 border">30</td><td className="p-2 border">Sales</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    answerQuery: 'SELECT D.DeptName FROM Employees E JOIN Departments D ON E.DeptID = D.DeptID GROUP BY D.DeptName HAVING COUNT(E.EmployeeID) > 2;',
    answerTable: `
      <table className="w-full text-left border-collapse max-w-xs">
        <thead><tr><th className="p-2 border">DeptName</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">IT</td></tr>
        </tbody>
      </table>
    `,
    alternatives: [
      {
        title: 'Using a Subquery in the FROM clause (Derived Table):',
        query: `SELECT DeptName FROM (SELECT D.DeptName, COUNT(E.EmployeeID) as EmployeeCount FROM Employees E JOIN Departments D ON E.DeptID = D.DeptID GROUP BY D.DeptName) AS DeptCounts WHERE EmployeeCount > 2;`
      }
    ],
    followUp: [
      "What's the crucial difference between the WHERE clause and the HAVING clause?",
      'How would you change the query to find departments with an average salary below $75,000?',
      'How could you list the departments that have exactly one employee?'
    ]
  },
    // --- Question 5 ---
  {
    type: 'question',
    title: 'Question 5: Window Functions to Access Other Rows',
    concept: 'Using LAG() to access data from a previous row.',
    question: "For each website visit, show the timestamp of the previous visit by the same user. If it is the user's first visit, it should show NULL.",
    sampleTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">VisitID</th><th className="p-2 border">UserID</th><th className="p-2 border">VisitTimestamp</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">1</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:00:00</td></tr>
          <tr><td className="p-2 border">2</td><td className="p-2 border">102</td><td className="p-2 border">2023-10-01 09:05:00</td></tr>
          <tr><td className="p-2 border">3</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:10:00</td></tr>
          <tr><td className="p-2 border">4</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:25:00</td></tr>
          <tr><td className="p-2 border">5</td><td className="p-2 border">102</td><td className="p-2 border">2023-10-01 09:30:00</td></tr>
        </tbody>
      </table>
    `,
    answerQuery: 'SELECT VisitID, UserID, VisitTimestamp, LAG(VisitTimestamp, 1) OVER (PARTITION BY UserID ORDER BY VisitTimestamp) AS PreviousVisit FROM Website_Visits;',
    answerTable: `
      <table className="w-full text-left border-collapse">
        <thead><tr><th className="p-2 border">VisitID</th><th className="p-2 border">UserID</th><th className="p-2 border">VisitTimestamp</th><th className="p-2 border">PreviousVisit</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">1</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:00:00</td><td className="p-2 border">NULL</td></tr>
          <tr><td className="p-2 border">3</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:10:00</td><td className="p-2 border">2023-10-01 09:00:00</td></tr>
          <tr><td className="p-2 border">4</td><td className="p-2 border">101</td><td className="p-2 border">2023-10-01 09:25:00</td><td className="p-2 border">2023-10-01 09:10:00</td></tr>
          <tr><td className="p-2 border">2</td><td className="p-2 border">102</td><td className="p-2 border">2023-10-01 09:05:00</td><td className="p-2 border">NULL</td></tr>
          <tr><td className="p-2 border">5</td><td className="p-2 border">102</td><td className="p-2 border">2023-10-01 09:30:00</td><td className="p-2 border">2023-10-01 09:05:00</td></tr>
        </tbody>
      </table>
    `,
    alternatives: [
      {
        title: 'Using a Correlated Subquery (less efficient):',
        query: `SELECT w1.VisitID, w1.UserID, w1.VisitTimestamp, (SELECT MAX(w2.VisitTimestamp) FROM Website_Visits w2 WHERE w2.UserID = w1.UserID AND w2.VisitTimestamp < w1.VisitTimestamp) AS PreviousVisit FROM Website_Visits w1;`
      }
    ],
    followUp: [
      'How would you find the timestamp of the *next* visit by the same user? (Hint: Use LEAD())',
      "How could you use this to calculate the time difference between a user's consecutive visits?",
      'What does PARTITION BY do? What would happen if you removed it from the query?'
    ]
  },
  // --- Final Slide ---
  {
    type: 'title',
    title: 'Thank You & Q/A',
    subtitle: 'Happy Querying!',
  }
];

// --- Components ---

// A reusable component to display a code block
const CodeBlock = ({ code }) => (
  <div className="relative">
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono">
      <code>{code.trim()}</code>
    </pre>
    <button
      onClick={() => navigator.clipboard.writeText(code.trim())}
      className="absolute top-2 right-2 px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-500 transition-colors"
      title="Copy to clipboard"
    >
      Copy
    </button>
  </div>
);

// Component for the Title Slide
const TitleSlide = ({ title, subtitle }) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-2xl md:text-3xl text-gray-600">{subtitle}</p>
  </div>
);

// Component for a standard content slide
const ContentSlide = ({ title, content }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">{title}</h2>
    <ul className="space-y-4 text-xl text-gray-700 list-disc pl-5">
      {content.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

// Component for the Setup Slide
const SetupSlide = ({ title, setupCode }) => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">{title}</h2>
        <p className="mb-4 text-lg text-gray-700">Copy and paste this entire block into your MySQL client to create and populate all the necessary tables for the quiz.</p>
        <CodeBlock code={setupCode} />
    </div>
);


// Component for a Question/Answer slide
const QuestionSlide = ({ slide, showAnswer }) => {
  const { title, concept, question, sampleTable, answerQuery, answerTable, alternatives, followUp } = slide;
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-lg text-blue-600 font-medium mb-6">{concept}</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Question</h3>
          <p className="text-xl bg-blue-50 p-4 rounded-lg">{question}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Sample Data</h3>
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: sampleTable }} />
        </div>

        {showAnswer && (
          <div className="space-y-6 pt-6 border-t-2 border-dashed mt-6">
            <div>
              <h3 className="text-3xl font-semibold text-green-700 mb-3">Answer Query</h3>
              <CodeBlock code={answerQuery} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Result</h3>
              <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: answerTable }} />
            </div>
            {alternatives && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Alternative Queries</h3>
                <div className="space-y-4">
                  {alternatives.map((alt, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-600">{alt.title}</p>
                      <CodeBlock code={alt.query} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {followUp && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Follow-up Questions</h3>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  {followUp.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const goToNext = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowAnswer(false); // Hide answer when moving to the next slide
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowAnswer(false); // Hide answer when moving to the previous slide
    }
  };

  // Add keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrev();
          break;
        case 'Enter':
          if (slidesData[currentSlide].type === 'question' && !showAnswer) {
            event.preventDefault();
            setShowAnswer(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, showAnswer]);
  
  const slide = slidesData[currentSlide];
  const isQuestionSlide = slide.type === 'question';

  return (
    <div className="bg-gray-100 font-sans flex flex-col h-screen">
       {/* Header */}
      <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <h1 className="text-xl font-bold text-gray-800">Advanced SQL Quiz</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
          <div className="text-gray-600 text-sm sm:text-base">
            Slide {currentSlide + 1} of {slidesData.length}
          </div>
          <div className="text-xs text-gray-500">
            Use ← → arrows, spacebar, or Enter
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
          {slide.type === 'title' && <TitleSlide {...slide} />}
          {slide.type === 'content' && <ContentSlide {...slide} />}
          {slide.type === 'setup' && <SetupSlide {...slide} />}
          {isQuestionSlide && <QuestionSlide slide={slide} showAnswer={showAnswer} />}
        </div>
      </main>

      {/* Footer / Navigation */}
      <footer className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors"
          aria-label="Go to previous slide"
        >
          Previous
        </button>
        
        {isQuestionSlide && !showAnswer && (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
            aria-label="Show answer to current question"
          >
            Show Answer
          </button>
        )}
        
        <button
          onClick={goToNext}
          disabled={currentSlide === slidesData.length - 1}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors"
          aria-label="Go to next slide"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
