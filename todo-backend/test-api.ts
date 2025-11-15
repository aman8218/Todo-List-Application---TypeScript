import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL';
  message: string;
}

const results: TestResult[] = [];

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

let authToken = '';
let userId = '';
let todoId = '';

// Test data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'test123456',
};

const testTodo = {
  title: 'Test Todo Item',
  description: 'This is a test todo description',
};

// Helper function to log results
const logResult = (name: string, status: 'PASS' | 'FAIL', message: string) => {
  results.push({ name, status, message });
  const emoji = status === 'PASS' ? '✅' : '❌';
  console.log(`${emoji} ${name}: ${message}`);
};

// Test functions
const testHealthCheck = async () => {
  try {
    const response = await api.get('/health');
    const data = response.data as any;
    if (data.success) {
      logResult('Health Check', 'PASS', 'Server is running');
    } else {
      logResult('Health Check', 'FAIL', 'Unexpected response');
    }
  } catch (error: any) {
    logResult('Health Check', 'FAIL', error.message);
  }
};

const testSignup = async () => {
  try {
    const response = await api.post('/auth/signup', testUser);
    const data = response.data as any;
    if (data.success && data.token) {
      authToken = data.token;
      userId = data.user.id;
      logResult('User Signup', 'PASS', `User created: ${data.user.email}`);
    } else {
      logResult('User Signup', 'FAIL', 'No token received');
    }
  } catch (error: any) {
    logResult('User Signup', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testSignin = async () => {
  try {
    const response = await api.post('/auth/signin', {
      email: testUser.email,
      password: testUser.password,
    });
    const data = response.data as any;
    if (data.success && data.token) {
      authToken = data.token;
      logResult('User Signin', 'PASS', 'Login successful');
    } else {
      logResult('User Signin', 'FAIL', 'No token received');
    }
  } catch (error: any) {
    logResult('User Signin', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testInvalidSignin = async () => {
  try {
    await api.post('/auth/signin', {
      email: testUser.email,
      password: 'wrongpassword',
    });
    logResult('Invalid Signin', 'FAIL', 'Should have failed but succeeded');
  } catch (error: any) {
    if (error.response?.status === 401) {
      logResult('Invalid Signin', 'PASS', 'Correctly rejected invalid credentials');
    } else {
      logResult('Invalid Signin', 'FAIL', 'Unexpected error');
    }
  }
};

const testGetMe = async () => {
  try {
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && data.user) {
      logResult('Get Current User', 'PASS', `Retrieved user: ${data.user.email}`);
    } else {
      logResult('Get Current User', 'FAIL', 'No user data received');
    }
  } catch (error: any) {
    logResult('Get Current User', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testForgotPassword = async () => {
  try {
    const response = await api.post('/auth/forgot-password', {
      email: testUser.email,
    });
    const data = response.data as any;
    if (data.success) {
      logResult('Forgot Password', 'PASS', 'Password reset email sent (check logs)');
    } else {
      logResult('Forgot Password', 'FAIL', 'Unexpected response');
    }
  } catch (error: any) {
    // Email might fail if not configured, but endpoint should work
    if (error.response?.status === 500 && error.response?.data?.message?.includes('Email')) {
      logResult('Forgot Password', 'PASS', 'Endpoint works (email not configured)');
    } else {
      logResult('Forgot Password', 'FAIL', error.response?.data?.message || error.message);
    }
  }
};

const testCreateTodo = async () => {
  try {
    const response = await api.post('/todos', testTodo, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && data.todo) {
      todoId = data.todo._id;
      logResult('Create Todo', 'PASS', `Todo created: ${data.todo.title}`);
    } else {
      logResult('Create Todo', 'FAIL', 'No todo data received');
    }
  } catch (error: any) {
    logResult('Create Todo', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testGetTodos = async () => {
  try {
    const response = await api.get('/todos', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && Array.isArray(data.todos)) {
      logResult('Get All Todos', 'PASS', `Retrieved ${data.count} todos`);
    } else {
      logResult('Get All Todos', 'FAIL', 'Invalid response format');
    }
  } catch (error: any) {
    logResult('Get All Todos', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testGetSingleTodo = async () => {
  try {
    const response = await api.get(`/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && data.todo) {
      logResult('Get Single Todo', 'PASS', `Retrieved todo: ${data.todo.title}`);
    } else {
      logResult('Get Single Todo', 'FAIL', 'No todo data received');
    }
  } catch (error: any) {
    logResult('Get Single Todo', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testUpdateTodo = async () => {
  try {
    const updatedData = {
      title: 'Updated Todo Title',
      description: 'Updated description',
    };
    const response = await api.put(`/todos/${todoId}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && data.todo.title === updatedData.title) {
      logResult('Update Todo', 'PASS', 'Todo updated successfully');
    } else {
      logResult('Update Todo', 'FAIL', 'Todo not updated correctly');
    }
  } catch (error: any) {
    logResult('Update Todo', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testToggleTodoCompletion = async () => {
  try {
    const response = await api.patch(`/todos/${todoId}/toggle`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success && data.todo.completed === true) {
      logResult('Toggle Todo Completion', 'PASS', 'Todo marked as completed');
    } else {
      logResult('Toggle Todo Completion', 'FAIL', 'Todo not toggled correctly');
    }
  } catch (error: any) {
    logResult('Toggle Todo Completion', 'FAIL', error.response?.data?.message || error.message);
  }
};

const testUnauthorizedAccess = async () => {
  try {
    await api.get('/todos');
    logResult('Unauthorized Access', 'FAIL', 'Should have been rejected');
  } catch (error: any) {
    if (error.response?.status === 401) {
      logResult('Unauthorized Access', 'PASS', 'Correctly rejected unauthorized request');
    } else {
      logResult('Unauthorized Access', 'FAIL', 'Unexpected error');
    }
  }
};

const testDeleteTodo = async () => {
  try {
    const response = await api.delete(`/todos/${todoId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = response.data as any;
    if (data.success) {
      logResult('Delete Todo', 'PASS', 'Todo deleted successfully');
    } else {
      logResult('Delete Todo', 'FAIL', 'Unexpected response');
    }
  } catch (error: any) {
    logResult('Delete Todo', 'FAIL', error.response?.data?.message || error.message);
  }
};

// Main test runner
const runTests = async () => {
  console.log('\n🚀 Starting API Tests...\n');
  console.log('='.repeat(60));

  // Health check
  await testHealthCheck();
  console.log('');

  // Auth tests
  console.log('📝 AUTHENTICATION TESTS');
  console.log('-'.repeat(60));
  await testSignup();
  await testSignin();
  await testInvalidSignin();
  await testGetMe();
  await testForgotPassword();
  console.log('');

  // Todo tests
  console.log('📋 TODO TESTS');
  console.log('-'.repeat(60));
  await testUnauthorizedAccess();
  await testCreateTodo();
  await testGetTodos();
  await testGetSingleTodo();
  await testUpdateTodo();
  await testToggleTodoCompletion();
  await testDeleteTodo();
  console.log('');

  // Summary
  console.log('='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(2)}%`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results
      .filter(r => r.status === 'FAIL')
      .forEach(r => console.log(`  - ${r.name}: ${r.message}`));
  }

  console.log('\n✨ Testing completed!\n');
};

// Run tests
runTests().catch(console.error);