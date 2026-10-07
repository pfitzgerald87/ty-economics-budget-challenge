# TY Economics Budget Challenge

A classroom budget simulation built with Next.js and Tailwind, with Supabase-ready schemas for future multiplayer or classroom tracking.

## Features

- Teacher/admin and minister role switching
- Tax Summit decisions
- Department planning with issue and spending-cut selection
- Real-time funding request calculation
- Budget balance and election outcome forecasting
- Score summary for voters, people, jobs and environment categories
- Supabase-friendly data model and SQL schema

## Stack

- Frontend: React + Next.js + Tailwind CSS
- Backend: Supabase-ready schema and client utility

## Local setup

1. Install dependencies:
   npm install
2. Copy the environment template:
   cp .env.example .env.local
3. Add your Supabase values in `.env.local`:
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
4. Run the app:
   npm run dev
5. Open http://localhost:3000

## Project structure

- app/ - App router pages and styling
- lib/gameData.js - Budget game data and logic values
- lib/supabase.js - Supabase client initialization
- supabase/schema.sql - Database schema for users, sessions, departments, scores and results

## Notes

This build is designed as a game prototype and classroom simulation tool. It is production-friendly for local classroom use and ready to be connected to Supabase when you add your credentials.
