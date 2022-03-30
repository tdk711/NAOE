///////////// OE5450 Assignment-5 ///////////////
////// Solution of Linear Burgers' Equation ////
////// Dilip Kumar NA18B004 | Spring 20022 //////

#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){
    // Create Output file
    ofstream oStream;
    oStream.open("output_1.txt");

    // Declare Variables
    double C[201], Ct[201], dx, dt;
    const double u0 = 1.0;
    const double alpha = 0.1;

    //Initialising Variables:
    for (int i = 0;  i < 201; i++)
    {
            C[i] = 0.0;
            Ct[i] = 0.0;
    }

    dx = 0.00;
    dt = 0.00;

    Ct[100] = 1.0;
    for(int i = 0; i < 201; i++){
        oStream << Ct[i] <<" ";
    }
    oStream << endl;
    // Magnitude of Discrete Step:
    dt = 0.01;
    dx = 0.1;

    // Defining Constants:
    const double c = (u0*dt)/(2.0*dx);
    const double D = (alpha*dt)/(pow(dx,2));
    cout<<c<<" "<<D<<endl;

    // Solution:
    for (int t = 0; t < 300; t++){

        for (int i = 0; i<201; i++){
            C[i] = Ct[i];
        }
        
        for (int i = 0; i < 201; i++)
        {
            
            // Left Boundary:
            if (i == 0){
                Ct[i] =  C[i+1]*(D - c) + (1 - 2*D)*C[i] + C[i+1]*(c + D);
            }

            // Right Boundary:
            else if (i == 200){
                Ct[i] =  C[i-1]*(D - c) + (1 - 2*D)*C[i] + C[i-1]*(c + D);
            }

            // Interior Elements:
            else{
                Ct[i] =  C[i+1]*(D - c) + (1 - 2*D)*C[i] + C[i-1]*(c + D);
            }

            oStream << Ct[i] << " ";
        }
         oStream << endl;
    }

    
    oStream.close();
    return 0;
}