#!/bin/bash

# Student Exercise Issue Generator
# This script creates GitHub issues for all 14 student exercise templates

echo "🚀 Creating Student Exercise Issues..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   https://cli.github.com/manual/installation"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub. Please run: gh auth login"
    exit 1
fi

# Array of student exercise names for easier management
declare -a exercises=(
    "Rating Features"
    "Search Enhancements" 
    "Watchlist Features"
    "Loading States"
    "Error Handling"
    "Theme System"
    "Accessibility Features"
    "Form Validation"
    "Micro-interactions"
    "Performance Optimization"
    "Data Management"
    "TypeScript Enhancement"
    "Testing Implementation"
    "Documentation & Deployment"
)

# Create issues for each student
for i in {1..14}; do
    student_num=$(printf "%02d" $i)
    exercise_name="${exercises[$i-1]}"
    
    echo "📝 Creating issue for Student ${student_num} - ${exercise_name}..."
    
    # Create the issue using GitHub CLI
    gh issue create \
        --title "Student ${student_num} - Choose Your Task: ${exercise_name}" \
        --label "student-exercise" \
        --label "good-first-issue" \
        --body-file ".github/ISSUE_TEMPLATE/student-exercises/student-${student_num}.yml" \
        --assignee "" \
        || echo "⚠️ Failed to create issue for Student ${student_num}"
    
    # Small delay to avoid rate limiting
    sleep 1
done

echo "✅ Finished creating student exercise issues!"
echo "📋 Next steps:"
echo "   1. Go to your GitHub repository"
echo "   2. Check the Issues tab"
echo "   3. Assign students to their chosen exercises"
echo "   4. Create a GitHub Project board for tracking progress"
