> A node.js script to organize any folder by file type

## Usage

- ### To run it as a task _(organzie and close)_

  ```PowerShell
  node . -f full\path\to\folder
  ```

  To set the task as a daily task on windows, do the following:

  1. Open Task Scheduler:
     - Press Win + S to open the search bar.
     - Type "Task Scheduler" and press Enter.
  2. Create Basic Task:
     - In the right-hand pane, click on "Create Basic Task..." This will open the "Create Basic Task Wizard."
  3. Name and Description:
     - Enter a name and description for your task, then click "Next."
  4. Trigger:
     - Choose the trigger that will start the task. Set it to start daily. Click "Next" after selecting the trigger.
  5. Start Date and Time:
     - Set the start date and time for the task. Click "Next" when done.
  6. Action:
     - Choose the action to perform. Set it to "Start a program." Click "Next" when done.
  7. Program/Script and Arguments:
     - Set the program/script to run to `node` and the arguments to `path\to\organize-folder\index.js -f full\path\to\folder`. Click "Next" when done.
  8. Finish:
     - Review the information about the task. If everything looks correct, click "Finish."
