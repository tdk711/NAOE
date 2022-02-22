#include <iostream>
#include <fstream>

using namespace std;

// Function Prototypes:
void input_parser();

// Global Variables:
double X[41], Y[41];

int main(){

    // Declare Variables
    double ans[41][2]; 

    input_parser(); // Parsing Input File to an Array

    
    // Calculating Derivatives:
    for (int i = 1; i < 40; i++){

        ans[i][0] = X[i]; 
        ans[i][1] = (Y[i+1] - Y[i-1])/(X[i+1] - X[i-1]);

    }

    ans[0][0] = 0.00;
    ans[0][1] = 0.00;

    ans[40][0] = 20.00;
    ans[40][1] = 0.00;

    // Writing Output to File:
    ofstream oStream;
    oStream.open("cubic_acc.txt");

    for (int i = 0;  i < 41; i++)
    {
        oStream << ans[i][0] << " " << ans[i][1] << endl;

    }
    
    oStream.close();


    return 0;
}

void input_parser(){
    
    double number;
    ifstream iStream;
    iStream.open("Cubic_output.txt");
    
    for (int i = 0;  i < 41; i++)
    {
        iStream >> number;
        X[i] = number;

        iStream >> number;
        Y[i] = number;
    }
    
    iStream.close();
    
}


