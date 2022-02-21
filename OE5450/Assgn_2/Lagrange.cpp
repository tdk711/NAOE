#include <iostream>
#include <fstream>

using namespace std;

// Function Prototypes:
void input_parser();
double LaGrange(double);

// Global Variables:
double X[21], Y[21];

int main(){

    // Declare Variables
    double x, ans[61][2]; 

    //Initialise Variable
    x = 0; 
    
    // Parsing Input File to an Array
    input_parser(); 

    // Calculating Interpolating Points:
    for (int i = 0; i < 61; i++){

        if(i % 3 != 0){
        x = static_cast<float>(i);
        x = x/3;

        ans[i][0] = x;
        ans[i][1] = LaGrange(x);
        }

        else{
            
            ans[i][0] = X[static_cast<int>(i/3)];
            ans[i][1] = Y[static_cast<int>(i/3)];
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

double LaGrange(double x){

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
