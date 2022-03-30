///////////// OE5450 Assignment-5 ///////////////
////// Solution of Linear Burgers' Equation ////
////// Dilip Kumar NA18B004 | Spring 2022 //////

#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){
    // Declare Variables
    float Ct[2001], Ct1[2001], dx, dt;
    const float u0 = 1.0;
    const float alpha = 0.01;
    int Nx, Nt, m;

    // Magnitude of Discrete Step:
    dt = 0.001;
    dx = 0.01;

    // Lengths:
    Nx = static_cast<int>(20.0/dx);
    Nt = static_cast<int>(3.0/dt);
    

    ofstream oStream;
    oStream.open("output_3.txt");

    // Initialising Array:
    for (int i = 0;  i < 2001; i++)
    {
            Ct[i] = 0.0;
            Ct1[i] = 0.0;
    }

    // Defining Constants:
    const float c = (u0*dt)/(2.0*dx);
    const float D = (alpha*dt)/(pow(dx,2));
    cout<< c <<"  "<<D<<endl;


    // Solution:
    for (int t = 0; t < 3000; t++){

        for (int i = 0;  i < 2001; i++)
        {
            Ct[i] = Ct1[i];
        }        
        Ct[1000] = 1.0;

        for (int i = 0; i < 2001; i++)
        {
            // Left Boundary:
            if (i == 0){
                Ct1[i] =  Ct[i+1]*(D - c) + (1 - 2*D)*Ct[i] + Ct[i+1]*(c + D);
            }

            // Interior Elements:
            else if(i != 1000){
                Ct1[i] =  Ct[i+1]*(D - c) + (1 - 2*D)*Ct[i] + Ct[i-1]*(c + D);
            }

            else if(i == 1000){
                Ct1[i] =  Ct[i];
            }

            // Right Boundary:
            else if (i == 2000){
                Ct1[i] =  Ct[i-1]*(D - c) + (1 - 2*D)*Ct[i] + Ct[i-1]*(c + D);
            }

            oStream << Ct[i] << " ";
        }
        
        oStream << endl;
    }

    // Writing Output to File:

    
    oStream.close();
    cout<<"End";
    return 0;
}
