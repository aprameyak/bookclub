'use client'
import { useState } from "react";
import styles from "./page.module.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  const [bookId, setBookId] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [monthRead, setMonthRead] = useState('');
  const [yearRead, setYearRead] = useState('');
  const [book, setBook] = useState(null);

  const API_URL = 'https://6jm020esfb.execute-api.us-east-1.amazonaws.com/'; 

  const createBook = async () => {
    const response = await fetch(`${API_URL}CreateBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        monthRead,
        yearRead,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const readBook = async () => {
    const response = await fetch(`${API_URL}ReadBook/${bookId}`);
    const data = await response.json();
    setBook(data);
  };

  const updateBook = async () => {
    const response = await fetch(`${API_URL}UpdateBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        monthRead,
        yearRead,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteBook = async () => {
    const response = await fetch(`${API_URL}DeleteBook/${bookId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <ClerkProvider>
      <SignedOut>
        <Box>
          <SignInButton />
        </Box>
      </SignedOut>
      <SignedIn>
        <Box>
          <Box>
            <UserButton />
          </Box>
          <Box>
            <Typography variant="h5">Add New Book</Typography>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              label="Month Read"
              value={monthRead}
              onChange={(e) => setMonthRead(e.target.value)}
            />
            <TextField
              label="Year Read"
              value={yearRead}
              onChange={(e) => setYearRead(e.target.value)}
            />
            <Button onClick={createBook}>Create Book</Button>
          </Box>
          <Box>
            <Typography variant="h5">Read Book</Typography>
            <TextField
              label="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
            <Button onClick={readBook}>Read Book</Button>
            {book && (
              <Box>
                <Typography>Title: {book.title}</Typography>
                <Typography>Author: {book.author}</Typography>
                <Typography>Month Read: {book.monthRead}</Typography>
                <Typography>Year Read: {book.yearRead}</Typography>
              </Box>
            )}
          </Box>
          <Box>
            <Typography variant="h5">Update Book</Typography>
            <TextField
              label="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              label="Month Read"
              value={monthRead}
              onChange={(e) => setMonthRead(e.target.value)}
            />
            <TextField
              label="Year Read"
              value={yearRead}
              onChange={(e) => setYearRead(e.target.value)}
            />
            <Button onClick={updateBook}>Update Book</Button>
          </Box>
          <Box>
            <Typography variant="h5">Delete Book</Typography>
            <TextField
              label="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
            <Button onClick={deleteBook}>Delete Book</Button>
          </Box>
        </Box>
      </SignedIn>
    </ClerkProvider>
  );
}
