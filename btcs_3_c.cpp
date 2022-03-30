///////////// OE5450 Assignment-5 ///////////////
////// Solution of Linear Burgers' Equation ////
////// Dilip Kumar NA18B004 | Spring 2022 //////

#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){
    // Declare Variables
    double C[20001], Ct[20001], dx, dt;
    const double u0 = 1.0;
    const double alpha = 0.001;

    // Magnitude of Discrete Step:
    dt = 0.01;
    dx = 0.001;

    ofstream oStream;
    oStream.open("output_3.txt");

    // Initialising Array:
    for (int i = 0;  i < 20001; i++)
    {
            C[i] = 0.0;
            Ct[i] = 0.0;
    }

        Ct[10000] = 1.0;

    // Defining Constants:
    const double cf = (u0*dt)/(2.0*dx);
    const double D = (alpha*dt)/(pow(dx,2));
    cout<< cf <<"  "<<D<<endl;

  double a[20001], b[20001], c[20001], d[20001];

for (int t = 0; t < 300; t++){

        for (int i = 0;  i < 20001; i++)
    {
            C[i] = Ct[i];
    }

        for (int i = 0; i < 20001; i++){
            oStream << C[i] << " ";
        }
    
 // Tri-Diagonal Matrix Solver:
    // Generating the coefficient series
    for (int i = 0; i < 20001; i++){
        a[i] = -(cf + D);
        b[i] = 1 + 2*D;
        c[i] = cf - D; 
        d[i] = C[i];
    }

    c[0] = -2*D;
    a[2000] = -2*D;

    // Backward Elimination:
    a[20000] = a[20000]/b[20000];
    d[20000] = d[20000]/b[20000];

    for (int i = 19999; i >= 0; i--){

        a[i] = (a[i])/(b[i] - a[i+1]*c[i]);

        d[i] = (d[i] - d[i+1]*c[i])/(b[i] - a[i+1]*c[i]);

    }

    // Forward Substitution:
    Ct[0] = d[0]/b[0];
    Ct[10000] = 1.0;
    for (int i = 1; i < 20001; i++){
       if(i != 10000){
        Ct[i] = (d[i] - a[i]*Ct[i-1]);}
    }

    oStream << endl;
 }
    
    // Writing Output to File:



    
    oStream.close();
    cout<<"End";
    return 0;
}