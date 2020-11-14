CC = g++
CSRCFLAGS = -O2 -Wall -Wextra -std=c++17
LDFLAGS = -L../lib/boost_1_74_0 -lboost_system -lpthread -D_WEBSOCKETPP_CPP11_STL_

#Location of files
SRC_DIR = ../src
LIB_DIR = ../lib

HEADER_DIR = ../include

#Object store location
OBJ_DIR = ./objects

#getting all .cpp files
SRC = $(shell find $(SRC_DIR) -name *.cpp)

# Generating the names of objects that the .cpp files compile into
OBJ = $(patsubst $(SRC_DIR)/%.cpp, $(OBJ_DIR)/%.o, $(SRC))

# Getting dependencies
DEPS = $(patsubst %.o,%.d,$(OBJ))

#output file name
BUILD_NAME = socket_server

#compilation steps
build: $(OBJ)
	$(CC) -o $(BUILD_NAME) $(OBJ) $(LDFLAGS) $(CSRCFLAGS)

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	mkdir -p $(@D)
	$(CC) $(CSRCFLAGS) -I$(SRC_DIR) -I$(HEADER_DIR) -c -MMD $< -o $@

run: build
	./$(BUILD_NAME)
	
clean:
	rm -rf ./objects
	rm -f $(BUILD_NAME)

rebuild: clean build

-include $(DEPS)