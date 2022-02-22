#include <iostream>
#include <fstream>

using namespace std;

// Function Prototypes:
void input_parser();
double Lagrange(double);

// Global Variables:
double X[21], Y[21];

int main(){

    // Declare Variables
    double x, ans[41][2]; 

    //Initialise Variable
    x = 0; 
    
    // Parsing Input File to an Array
    input_parser(); 

    // Calculating Interpolating Points:
    for (int i = 0; i < 41; i++){

        if(i % 2 != 0){

        x = (i/2) + (1.0/3.0);   
        ans[i][0] = x;
        ans[i][1] = Lagrange(x);
        }

        else{
            
            ans[i][0] = X[static_cast<int>(i/2)];
            ans[i][1] = Y[static_cast<int>(i/2)];
        }

    }


    // Writing Output to File:
    ofstream oStream;
    oStream.open("Lagrange_output.txt");

    for (int i = 0;  i < 61; i++)
    {
        oStream << ans[i][0] << " " << ans[i][1] << endl;

    }
    
    oStream.close();


    return 0;
}

void input_parser(){
    
    double number;
    ifstream iStream;
    iStream.open("data.txt");
    
    for (int i = 0;  i < 21; i++)
    {
        iStream >> number;
        X[i] = number;

        iStream >> number;
        Y[i] = number;
    }
    
    iStream.close();
    
}

double Lagrange(double x){

    double result, coefficient;
    result = 0.00;

    for (int i = 0; i < 21; i++)
    {
        coefficient = 1;

        for (int j = 0; j < 21; j++)
        {
            if (j != i){
                coefficient = (coefficient*(x - X[j]))/(X[i] - X[j]);
            }
        }
 
        result += coefficient*Y[i];
    }


    return result;
}
