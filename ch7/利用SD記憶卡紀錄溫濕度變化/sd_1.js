var logFile = E.openFile("test.txt", "a");
logFile.write("hello\r\n");
logFile.close();
E.unmountSD();