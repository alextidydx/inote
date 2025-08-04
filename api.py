import os
import time
from PIL import Image
import threading
import sqlite3
import json
import gc
import sys
import asyncio
import psutil
from tqdm.auto import tqdm
from flask import Flask, jsonify, request, send_from_directory, send_file

# models
import open_clip
from open_clip import tokenizer
import torch
import numpy as np
from transformers import AutoProcessor, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer

# watcher
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# video
from decord import VideoReader
from decord import cpu, gpu


# config img
urlImages = "./images"
imageExts = (".png", ".jpg", ".jpeg", ".jfif")
vidExts = (".avi", ".mp4", ".mpeg4", ".mov", ".mkv", ".gif")

# DB
dbPath = "main.db"
conn = None
cursor = None
defaultSearchNumber = 24

# daemon
host = "0.0.0.0"  # Use "0.0.0.0" if you want external access
port= 5000
publicFolder = "public"
httpThread = None
filesWatchDogDelay = 60.0
FILE_CORRUPTED_STR = "corrupted"


# http server
flaskApp = Flask(__name__)


# Create table to store filename, tags, and embeddings (as BLOB)
def initDb():
	global conn, cursor
	print("-----------------")
	print("init_db")
	conn = sqlite3.connect(dbPath, check_same_thread=False)
	cursor = conn.cursor()
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS notes (
			id  INTEGER,
			name    TEXT, 
			description    TEXT, 
			created   REAL,
			last_modified   REAL, 
			status   INTEGER, 
			rating  REAL, 
			PRIMARY KEY("id" AUTOINCREMENT)
		)
	""")
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS widgets (
			id  INTEGER,
			name    TEXT,
			description    TEXT, 
			created   REAL,
			last_modified   REAL, 
			status   INTEGER, 
			type   INTEGER,
			rating  REAL, 
			PRIMARY KEY("id" AUTOINCREMENT)
		)
	""")
	conn.commit()
	return True





### MAIN
if __name__ == "__main__":
	initDb()
