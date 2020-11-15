echo "Installing..."

# install header only websocketpp and boost libraries
# works on Linux and Mac OS. For installing you need admin access
mkdir ../lib
cd ../lib

# install websocketpp
git clone https://github.com/manchester-hyperloop/websocketpp
cd websocketpp
cmake .
sudo make install

#install boost
wget https://dl.bintray.com/boostorg/release/1.74.0/source/boost_1_74_0.zip
unzip boost_1_74_0.zip
cd boost_1_74_0
./bootstrap.sh
./b2

cd ../../build

make

echo "Done! run ./socket_server to start the web sockets server."
