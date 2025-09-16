import random

# Function to print the board
def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

# Function to check if a player has won
def check_win(board, player):
    win_conditions = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ]
    return [player, player, player] in win_conditions

# Function to evaluate the score of the board position
def evaluate(board):
    if check_win(board, 'X'):
        return 10
    elif check_win(board, 'O'):
        return -10
    else:
        return 0

# Function to check if the board is full
def is_full(board):
    for row in board:
        for cell in row:
            if cell == ' ':
                return False
    return True

# Minimax function for optimal move calculation
def minimax(board, depth, is_maximizing):
    if check_win(board, 'X'):
        return 10 - depth
    elif check_win(board, 'O'):
        return -10 + depth
    elif is_full(board):
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == ' ':
                    board[i][j] = 'X'
                    score = minimax(board, depth + 1, False)
                    board[i][j] = ' '
                    best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(3):
            for j in range(3):
                if board[i][j] == ' ':
                    board[i][j] = 'O'
                    score = minimax(board, depth + 1, True)
                    board[i][j] = ' '
                    best_score = min(score, best_score)
        return best_score

# Function to find the optimal move
def find_best_move(board):
    best_score = -float('inf')
    best_move = None
    for i in range(3):
        for j in range(3):
            if board[i][j] == ' ':
                board[i][j] = 'X'
                score = minimax(board, 0, False)
                board[i][j] = ' '
                if score > best_score:
                    best_score = score
                    best_move = (i, j)
    return best_move

# Main function to play the game
def play_game():
    board = [[' ' for _ in range(3)] for _ in range(3)]
    print("Welcome to Tic Tac Toe!")
    print_board(board)
    
    while not is_full(board) and not check_win(board, 'X') and not check_win(board, 'O'):
        # Player's move
        while True:
            try:
                row = int(input("Enter the row (0-2): "))
                col = int(input("Enter the column (0-2): "))
                if board[row][col] != ' ':
                    print("Invalid move. Try again.")
                else:
                    break
            except (ValueError, IndexError):
                print("Invalid input. Enter numbers between 0 and 2.")
        
        board[row][col] = 'O'
        print_board(board)
        
        # Check if player wins
        if check_win(board, 'O'):
            print("Congratulations! You won!")
            return
        
        # AI's move
        print("AI is making a move...")
        ai_move = find_best_move(board)
        if ai_move:
            ai_row, ai_col = ai_move
            board[ai_row][ai_col] = 'X'
            print_board(board)
        
        # Check if AI wins
        if check_win(board, 'X'):
            print("AI wins! Better luck next time.")
            return
    
    if not check_win(board, 'X') and not check_win(board, 'O'):
        print("It's a draw!")

# Run the game
if __name__ == "__main__":
    play_game()
