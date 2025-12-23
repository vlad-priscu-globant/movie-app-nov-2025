# 🎓 Student Collaboration Exercises

Welcome to the Movie App collaborative development project! This document outlines 28 carefully designed exercises for 14 students to work on feature enhancements while learning modern web development practices.

## 📋 Overview

Each student will choose **ONE task** from their assigned pair of exercises. This approach ensures:
- ✅ **Decoupled Development**: Tasks are designed to minimize merge conflicts
- ✅ **Skill Diversity**: Mix of UI, backend, testing, and documentation work
- ✅ **Choice & Ownership**: Students can pick tasks that match their interests
- ✅ **Real-world Collaboration**: Experience working on a shared codebase

## 🚀 Getting Started

### 1. **Choose Your Exercise**
- Navigate to [GitHub Issues](../../issues)
- Find your assigned student number (Student 01-14)
- Read both task options carefully
- Choose the task that interests you most

### 2. **Setup Your Development Environment**
```bash
# Clone and setup
git clone https://github.com/vlad-priscu-globant/movie-app-nov-2025.git
cd movie-app-nov-2025
npm install

# Create your feature branch
git checkout -b feat/[student-number]-[task-name]
# Example: feat/01-rating-persistence
```

### 3. **Development Workflow**
```bash
# Start development server
npm run dev

# Build for production testing
npm run build

# Run linting
npm run lint
```

## 📚 Exercise Categories

### 🎨 **UI & UX** (Students 01, 03, 04, 06, 09)
Focus on user interface, animations, and user experience improvements.

### 🔍 **Search & Data** (Students 02, 05, 11, 12)
Handle search functionality, data management, and type safety.

### ♿ **Accessibility & Forms** (Students 07, 08)
Ensure the app is accessible to all users and has robust form handling.

### ⚡ **Performance & Testing** (Students 10, 13)
Optimize app performance and ensure code quality through testing.

### 📖 **Documentation** (Student 14)
Create comprehensive documentation and deployment guides.

## 🎯 Task Complexity Guide

| Complexity | Description | Time Estimate |
|------------|-------------|---------------|
| ⭐⭐ | Beginner-friendly, clear requirements | 2-4 hours |
| ⭐⭐⭐ | Intermediate, requires research | 4-8 hours |
| ⭐⭐⭐⭐ | Advanced, complex implementation | 8+ hours |

## 🔄 Collaboration Guidelines

### **Branch Naming Convention**
```
feat/[student-number]-[feature-name]
```

### **Commit Message Format**
```
type(scope): description

# Examples:
feat(rating): add localStorage persistence
fix(search): resolve debounce timing issue
docs(readme): update setup instructions
```

### **Pull Request Process**
1. **Create PR** against `main` branch
2. **Add description** explaining your implementation
3. **Request review** from assigned code reviewer
4. **Address feedback** and update code as needed
5. **Merge** once approved

## 🛡️ Conflict Prevention

### **File Lock System**
Some files are "locked" to specific students to prevent conflicts:

| File | Assigned To | Reason |
|------|-------------|---------|
| `movieStore.ts` | Student 01 | Central state management |
| `Search.vue` | Student 02 | Core search functionality |
| `main.css` | Student 06 | Theme system integration |

### **Communication Channels**
- **Discord**: `#movie-app-dev` for quick questions
- **GitHub Issues**: For task-related discussions
- **PR Comments**: For code review feedback

## 📊 Progress Tracking

### **GitHub Project Board**
Track progress at: [Student Exercises Board](../../projects/1)

### **Status Labels**
- 🟡 `in-progress`: Currently being worked on
- 🔵 `review-ready`: Ready for code review
- 🟢 `completed`: Merged and deployed
- 🔴 `blocked`: Needs help or has dependencies

## 🆘 Getting Help

### **Common Issues & Solutions**

#### **Merge Conflicts**
```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

#### **TypeScript Errors**
- Check the existing type definitions in `src/types/`
- Follow existing patterns in the codebase
- Ask in Discord for type-related questions

#### **CSS/Styling Issues**
- Use CSS custom properties for theming
- Follow the existing component structure
- Test on mobile and desktop viewports

### **Who to Ask**
- **Technical Questions**: @instructor in Discord
- **Git/GitHub Help**: @teaching-assistant
- **Design Decisions**: Check with other students working on related features

## 🏆 Success Criteria

### **Code Quality Checklist**
- [ ] Follows TypeScript best practices (no `any` types)
- [ ] Uses existing component patterns
- [ ] Includes error handling
- [ ] Works on mobile and desktop
- [ ] Passes existing tests (if any)

### **Documentation**
- [ ] Updates relevant README sections
- [ ] Adds JSDoc comments to new functions
- [ ] Includes usage examples for new components

### **Testing**
- [ ] Manual testing in development mode
- [ ] Build passes without errors
- [ ] Features work as expected in production build

## 🎉 Completion & Demo

Once all exercises are complete, we'll have:
- **Code Review Session**: Peer review of implementations
- **Demo Day**: Each student presents their feature
- **Retrospective**: Lessons learned and improvements for next time

## 📞 Support

Need help? Don't hesitate to reach out:
- **Immediate Help**: Discord `#movie-app-dev`
- **Technical Issues**: Create a GitHub issue with `help-wanted` label
- **Instructor Office Hours**: Tuesdays & Thursdays 2-4 PM

---

**Happy Coding! 🚀**

Let's build something amazing together!
