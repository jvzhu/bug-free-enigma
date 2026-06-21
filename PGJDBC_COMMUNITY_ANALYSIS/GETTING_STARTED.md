# 🌟 Getting Started with PgJDBC Contributing

> **Welcome to the PostgreSQL JDBC Driver community!**  
> This guide will help you make your first contribution in **less than 2 hours**.

---

## ⚡ Quick Start (15 minutes)

### 1️⃣ Fork & Clone

```bash
# Fork on GitHub: https://github.com/pgjdbc/pgjdbc

# Clone your fork
git clone https://github.com/YOUR_USERNAME/pgjdbc.git
cd pgjdbc

# Add upstream
git remote add upstream https://github.com/pgjdbc/pgjdbc.git
```

### 2️⃣ Set Up Dev Environment

```bash
# Requirements: Java 8+, PostgreSQL, Git

# Build
./gradlew build

# Run tests
./gradlew test

# Success! ✅
```

### 3️⃣ Create Branch

```bash
git fetch upstream
git checkout -b fix/issue-2538
```

---

## 🎯 Finding Your First Issue

### Browse Beginner Issues

**GitHub:** https://github.com/pgjdbc/pgjdbc/labels/good%20first%20issue

### Issue Categories

| Type | Examples | Difficulty |
|------|----------|------------|
| 📚 Documentation | Comments, README | Easy |
| 🧪 Tests | Edge cases, coverage | Easy-Medium |
| 🐛 Bug Fixes | Null handling, types | Medium |
| ✨ Features | New support, optimization | Medium-Hard |
| 🔧 Refactoring | Code cleanup | Medium |

---

## 💻 Making Your Change

### Step 1: Understand

```bash
# Read the issue
# Ask questions if unclear
# Check if someone is working on it
```

### Step 2: Explore Code

**PgJDBC Structure:**

```
pgjdbc/
├── pgjdbc/src/main/java/org/postgresql/
│   ├── jdbc/          # JDBC implementation
│   ├── core/          # Protocol & connection
│   ├── util/          # Utilities
│   └── ssl/           # SSL support
├── pgjdbc/src/test/java/
└── CONTRIBUTING.md
```

### Step 3: Code

**Style Guidelines:**
- 2 spaces (no tabs)
- Under 100 characters per line
- Add JavaDoc for public methods
- Use @Nullable annotation

### Step 4: Test

```bash
# Write tests in src/test/java/

# Run your tests
./gradlew test --tests org.postgresql.test.YourTest
```

### Step 5: Verify

```bash
# Check style
./gradlew styleCheck

# Auto-fix
./gradlew style

# Full check
./gradlew check
```

---

## 📤 Submitting Your PR

### Commit

```bash
git add .
git commit -m "fix: describe the change

- Explain what was fixed
- Why it was needed

Closes #ISSUE_NUMBER"
```

**Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:** fix, feat, docs, test, refactor, perf, chore

### Push & PR

```bash
git push origin fix/issue-2538

# Create PR on GitHub with clear description
```

**PR Checklist:**
- [ ] Tests pass locally
- [ ] Code style passes
- [ ] Documentation updated
- [ ] No breaking changes

### Review

```bash
# Make requested changes
git add .
git commit -m "review: address feedback"
git push origin fix/issue-2538
```

---

## 🆘 Getting Help

- **Stuck?** Comment on the issue
- **Questions?** Ask on GitHub Discussions
- **Chat?** Gitter: https://gitter.im/pgjdbc/pgjdbc
- **Email?** pgsql-jdbc@postgresql.org
- **Mentorship?** Join formal 12-week program

---

## ✅ Success Checklist

- [ ] Java 8+ installed
- [ ] Repository cloned
- [ ] Build successful
- [ ] Issue selected
- [ ] Branch created
- [ ] Changes implemented
- [ ] Tests written
- [ ] Code style checked
- [ ] Commit message meaningful
- [ ] PR created
- [ ] Feedback addressed
- [ ] PR merged ✅

---

## 🎉 Next Steps

1. Share your contribution
2. Reach out to mentors
3. Pick next issue
4. Build expertise
5. Consider code review role

---

**Welcome to PgJDBC! Excited to have you contribute!** 🚀

**Guide v1.0** | June 21, 2026