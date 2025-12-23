# 👨‍🏫 Instructor Guide: Student Collaboration Exercises

## 📋 Quick Setup Checklist

### ✅ **Phase 1: Repository Setup**
- [x] Created feature branch `feat/student-exercises`
- [x] Added 14 GitHub issue templates (28 total tasks)
- [x] Created comprehensive documentation
- [x] Pushed changes to GitHub

### 🔄 **Phase 2: Activation** (Manual Steps Required)

#### **1. Merge the Feature Branch**
```bash
# Create PR and merge to main
# Visit: https://github.com/vlad-priscu-globant/movie-app-nov-2025/pull/new/feat/student-exercises
```

#### **2. Generate GitHub Issues**
```bash
# After merge, run the automation script
chmod +x generate-student-issues.sh
./generate-student-issues.sh
```

#### **3. Create GitHub Project Board**
1. Go to your repository → Projects → New Project
2. Name it "Student Exercises"
3. Add columns: `To Do`, `In Progress`, `Review`, `Done`
4. Link the generated issues to the project

## 🎯 Exercise Distribution

### **28 Tasks for 14 Students** (2 options each)

| Student | Domain | Task A (⭐⭐) | Task B (⭐⭐⭐) |
|---------|--------|-------------|--------------|
| 01 | Rating | localStorage Persistence | Rating Histogram |
| 02 | Search | Debounce (300ms) | Search History |
| 03 | Watchlist | UI Components | Persistence System |
| 04 | Loading | Skeleton Loaders | Advanced Animations |
| 05 | Errors | Toast System | API Recovery |
| 06 | Theme | Dark Mode Toggle | Theme Customizer |
| 07 | A11y | ARIA Labels | Keyboard Navigation |
| 08 | Forms | Login Form | Review Form |
| 09 | UI | Hover Effects | Scroll Animations |
| 10 | Performance | Image Optimization | Virtual Scrolling |
| 11 | Data | Smart Caching | Offline Support |
| 12 | TypeScript | Generic Utilities | Strict Typing |
| 13 | Testing | Unit Tests | Component Tests |
| 14 | Docs | Documentation | Deployment Guide |

## 🛡️ Conflict Prevention Strategy

### **File Ownership Matrix**
```
Core Files (Protected):
├─ movieStore.ts      → Student 01 (Rating)
├─ Search.vue         → Student 02 (Search)
├─ main.css           → Student 06 (Theme)
├─ tmdb.ts            → Student 05 (API Errors)

Safe Zones (Multi-student):
├─ New Components     → All students
├─ Utils/             → Students 02,05,10,11,12
├─ Types/             → Students 12,13
├─ Documentation      → Student 14
```

### **Dependency Management**
- **No Circular Dependencies**: Tasks designed independently
- **Optional Integrations**: Features work standalone
- **Progressive Enhancement**: Each task adds value independently

## 📊 Progress Tracking

### **GitHub Labels System**
- `student-exercise` - All exercise issues
- `good-first-issue` - Beginner-friendly tasks (⭐⭐)
- `in-progress` - Currently being worked on
- `review-ready` - Ready for code review
- `blocked` - Needs instructor help

### **Milestone Tracking**
```
Week 1: Task Selection & Setup (25% complete)
Week 2: Implementation Phase (75% complete)
Week 3: Code Review & Integration (90% complete)
Week 4: Demo & Retrospective (100% complete)
```

## 🎓 Learning Objectives

### **Technical Skills**
- **Vue 3 Composition API**: Reactive state, composables
- **TypeScript**: Type safety, generics, utility types
- **Pinia State Management**: Stores, persistence
- **Modern CSS**: Custom properties, animations, responsiveness
- **Testing**: Unit tests, component testing
- **Git Collaboration**: Branching, PR workflow

### **Soft Skills**
- **Code Review**: Giving and receiving feedback
- **Documentation**: Technical writing, API docs
- **Problem Solving**: Research, debugging, asking for help
- **Team Communication**: Discord, GitHub discussions

## 🚨 Common Issues & Solutions

### **Merge Conflicts**
```bash
# Prevention: Regular main updates
git checkout main && git pull origin main
git checkout student-branch && git rebase main

# Resolution: 
1. Review conflicted files
2. Choose appropriate changes
3. Test thoroughly
4. Ask for help if unsure
```

### **TypeScript Errors**
- **No `any` types allowed** - Use proper interfaces
- **Follow existing patterns** - Check existing components
- **Ask in Discord** - Don't struggle alone

### **Styling Issues**
- **Use CSS custom properties** - Follow theme system
- **Mobile-first approach** - Test on multiple devices
- **Consistent spacing** - Use existing design tokens

## 📞 Support Channels

### **Student Communication**
- **Discord**: `#movie-app-dev` - Daily questions
- **GitHub Issues**: Task-specific discussions
- **PR Comments**: Code review feedback

### **Instructor Intervention Points**
1. **Day 1**: Task selection guidance
2. **Day 3**: Technical blocker check-in
3. **Day 5**: Code review sessions
4. **Day 7**: Integration testing

## 🎉 Success Metrics

### **Code Quality**
- [ ] All TypeScript errors resolved
- [ ] Responsive design working
- [ ] Error handling implemented
- [ ] Documentation updated

### **Collaboration**
- [ ] Clean git history
- [ ] Meaningful commit messages
- [ ] Constructive PR feedback
- [ ] Help given to other students

### **Learning Outcomes**
- [ ] Student can explain their implementation
- [ ] Code follows Vue.js best practices
- [ ] Feature integrates well with existing app
- [ ] Student learned something new

## 🔄 Post-Exercise Actions

### **Demo Day Planning**
1. **5-minute presentations** per student
2. **Live coding demo** of their feature
3. **Q&A session** with peers
4. **Technical challenges discussion**

### **Code Integration**
1. **Final code review** with instructor
2. **Merge to main branch** after approval
3. **Update project documentation**
4. **Deploy to staging environment**

### **Retrospective Topics**
- What worked well in the collaboration?
- Which tasks were too easy/difficult?
- How can the process be improved?
- What would you do differently next time?

---

**Ready to launch! 🚀**

The exercise system is designed to be:
- **Self-guided** for independent learners
- **Collaborative** for team building
- **Scalable** for different class sizes
- **Realistic** for industry preparation
