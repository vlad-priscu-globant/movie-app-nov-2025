# 🎬 Modern Movie Discovery App

A comprehensive Vue.js application demonstrating modern web development practices through a movie discovery interface powered by The Movie Database (TMDB) API.

## 🌟 App Overview

This application showcases a production-ready movie browsing experience with advanced features like pagination, search, state persistence, and responsive design. Built as an educational example of contemporary frontend architecture patterns.

### 🎯 Key Features

- **🔍 Movie Search**: Real-time search functionality with paginated results
- **📱 Responsive Design**: Mobile-first approach using Tailwind CSS
- **🔄 State Management**: Centralized state with Pinia store
- **🔗 URL Persistence**: Page state survives browser refresh via query parameters  
- **⚡ Performance**: Lazy loading components and efficient caching
- **🎨 Modern UI**: Clean interface with hover effects and loading states
- **📖 Type Safety**: Full TypeScript integration

## 🏗️ Data Flow Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   TMDB API      │◄───┤  API Layer   │◄───┤   Components    │
│  (External)     │    │  (tmdb.ts)   │    │ (MovieList.vue) │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │                      │
                              ▼                      ▼
                    ┌──────────────────┐    ┌─────────────────┐
                    │  Pinia Store     │◄───┤  Vue Router     │
                    │ (movieStore.ts)  │    │ (URL Params)    │
                    └──────────────────┘    └─────────────────┘
                              │                      │
                              ▼                      ▼
                    ┌──────────────────┐    ┌─────────────────┐
                    │  Cached Data     │    │   Browser       │
                    │  (In Memory)     │    │   History       │
                    └──────────────────┘    └─────────────────┘
```

### Data Flow Explanation

1. **User Interaction**: User navigates pages or searches movies
2. **Router Updates**: Vue Router updates URL with query parameters (`?page=3&search=batman`)
3. **Component Logic**: Components detect URL changes and trigger store actions
4. **Store Management**: Pinia store manages state, caching, and loading states
5. **API Calls**: Store calls TMDB API through abstracted service layer
6. **Data Transform**: Raw API responses are typed and normalized
7. **UI Updates**: Reactive components automatically re-render with new data
8. **Persistence**: State is persisted in URL for refresh/bookmark support

## 📁 Project Structure

```
src/
├── api/              # External API integration
│   └── tmdb.ts       # TMDB API service layer
├── components/       # Vue components
│   ├── MovieList.vue # Main movie grid with pagination
│   ├── MovieDetail.vue # Individual movie details
│   ├── Search.vue    # Search input component
│   └── partials/     # Reusable sub-components
│       └── MovieRating.vue
├── router/           # Vue Router configuration
│   └── index.ts      # Route definitions
├── stores/           # Pinia store management
│   └── movieStore.ts # Movie state management
├── types/            # TypeScript definitions
│   └── types.ts      # API response interfaces
└── assets/           # Static assets and styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn package manager
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-app-nov-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in root directory
   VITE_API_URL=your_tmdb_api_key_here
   VITE_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5174`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🛠️ Core Technologies & Libraries

### Frontend Framework
- **[Vue.js 3](https://vuejs.org/)** `^3.5.22` - Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)** `~5.9.0` - Static type checking and enhanced developer experience

### State Management & Routing
- **[Pinia](https://pinia.vuejs.org/)** `^3.0.3` - Vue official state management library
- **[Vue Router](https://router.vuejs.org/)** `^4.6.3` - Client-side routing with query parameter support

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** `^4.1.17` - Utility-first CSS framework
- **[@tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss/tree/main/packages/tailwindcss/vite)** `^4.1.17` - Vite integration for Tailwind

### Build Tools & Development
- **[Vite](https://vitejs.dev/)** `^7.1.11` - Next-generation frontend build tool
- **[@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue)** `^6.0.1` - Vue SFC support for Vite
- **[vite-plugin-vue-devtools](https://github.com/webfansplz/vite-plugin-vue-devtools)** `^8.0.3` - Enhanced Vue development experience

### Code Quality & Tooling
- **[vue-tsc](https://github.com/vuejs/language-tools)** `^3.1.1` - Vue TypeScript compiler
- **[Prettier](https://prettier.io/)** `3.6.2` - Code formatting
- **[npm-run-all2](https://github.com/bcomnes/npm-run-all2)** `^8.0.4` - Run multiple npm scripts

## 📚 Modern Web Development Concepts Demonstrated

### 1. **Composition API Pattern**
```typescript
// Modern reactive state management
const { popularMoviesList, currentPopularPage, isLoadingPopular } = storeToRefs(store)

// Computed properties for derived state
const movies = computed<SearchResult[]>(() => {
  if (searchQuery.value && searchList.value.results.length > 0) {
    return searchList.value.results;
  }
  return popularMoviesList.value.results;
})
```

### 2. **State Persistence Strategy**
```typescript
// URL-driven state management
onMounted(async () => {
  const pageFromUrl = parseInt(route.query.page as string) || 1;
  const searchFromUrl = route.query.search as string || "";
  
  if (searchFromUrl) {
    await store.searchMovieList(searchFromUrl, parseInt(route.query.searchPage as string) || 1);
  } else {
    await store.fetchPopularMovies(pageFromUrl);
  }
})
```

### 3. **TypeScript Integration**
```typescript
// Strong typing for API responses
export interface SearchResults {
  page: number;
  results: SearchResult[] | [];
  total_pages: number;
  total_results: number;
}
```

### 4. **Modern CSS Architecture**
```vue
<!-- Utility-first approach with Tailwind -->
<div class="grid grid-cols-2 gap-4 p-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
  <div class="rounded-lg overflow-hidden shadow hover:drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition hover:scale-110 duration-600">
```

### 5. **Async/Await Patterns**
```typescript
// Clean asynchronous operations
async function goToPopularPage(page: number) {
  if (page === currentPopularPage.value || isLoadingPopular.value) return;
  
  router.push({ path: '/', query: { page: page.toString() } });
  await store.goToPopularPage(page);
}
```

### 6. **Component Lazy Loading**
```typescript
// Performance optimization
const MovieRating = defineAsyncComponent(() => import("./partials/MovieRating.vue"))
```

## 🎓 Learning Outcomes

This project demonstrates:

- **Modern Vue 3** patterns and best practices
- **State management** with Pinia stores
- **TypeScript** integration in Vue applications
- **Responsive design** with Tailwind CSS
- **API integration** and error handling
- **URL state persistence** for better UX
- **Performance optimization** techniques
- **Component architecture** and reusability

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
```

## 🌐 API Integration

This app integrates with [The Movie Database (TMDB)](https://www.themoviedb.org/) API:

- **Popular Movies**: `/movie/popular`
- **Movie Search**: `/search/movie`  
- **Movie Details**: `/movie/{id}`

API responses are typed using TypeScript interfaces and cached in the Pinia store for optimal performance.

## 🎯 Educational Value

Perfect for students learning:

- Modern JavaScript/TypeScript development
- Vue.js ecosystem and best practices
- State management patterns
- API integration techniques
- Responsive web design
- Modern build tools and workflows

---

**Built with ❤️ using Vue 3 + TypeScript + Vite + Tailwind CSS**
