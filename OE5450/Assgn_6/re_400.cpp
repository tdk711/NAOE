///////////// OE5450 Assignment-6 ///////////////
////// Lid-Driven Cavity: V-S Approach ////
////// Dilip Kumar NA18B004 | Spring 2022 //////

#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){
    
    // Declare Variables
    double zeta[101][101], zetat[101][101], psi[101][101], psit[101][101], p[101][101], u[101][101], v[101][101];
    double z_conv, p_conv, e1, e2;
    int coi = 0;

    //Initialising Variables:
    for (int i = 0;  i < 101; i++){
        for (int j = 0; j < 101; j++){
            zeta[i][j] = 0.0;
            zetat[i][j] = 0.0;
            psi[i][j] = 0.0;
            psit[i][j] = 0.0;
            p[i][j] = 0.0;
            u[i][j] = 0.0;
            v[i][j] = 0.0;
        }
    }
    z_conv = 0.0;
    p_conv = 0.0;
    e1 = 0.0;
    e2 = 0.0;
    cout<<" Initialisation done"<<endl;

    // Defining Constants:
    const double Re = 400;
    const double d = 0.05;
    const double dt = 0.01;
    const double U = 1.0;
    cout<<" Definition done"<<endl;

    // Assign time-invariant Boundary Conditions:
    // 1. Stream Function:
    for (int i = 0; i < 101; i++){
        psi[i][0] = 0.0;  // Bottom
        psi[i][100] = 0.0;  // Top
        psi[0][i] = 0.0;  // Left
        psi[100][i] = 0.0;  // Right
    }

    // 2. Velocities: (No Slip Condition)
    for (int i = 0; i < 101; i++){
        v[0][i] = 0.0;
        v[100][i] = 0.0;
        u[i][0] = 0.0;
        u[i][100] = U;
    }

    // Solution:
    do{

        // Assign time-dependent Boundary Conditions: 
        // 1. Vorticity:
        for (int i = 0; i < 101; i++){
            zeta[i][100] = (2*(psi[i][100] - U*d -psi[i][99]))/(d*d);  // Lid
            zeta[i][0] = -(2*(psi[i][1] - psi[i][0]))/(d*d); // Bottom
            zeta[0][i] = -(2*(psi[1][i] - psi[0][i]))/(d*d); // Left
            zeta[100][i] = -(2*(psi[99][i] - psi[100][i]))/(d*d); // Right
        }

        // Solving Vorticity Transport Equation:
        for (int i = 1;  i < 100; i++)
        {
            for (int j = 1; j < 100; j++){
                zetat[i][j] = zeta[i][j] + dt*((1/Re)*(((zeta[i+1][j] -2*zeta[i][j] + zeta[i-1][j])/(d*d)) + ((zeta[i][j+1] -2*zeta[i][j] + zeta[i][j-1])/(d*d))) 
                - ((v[i][j+1]*zeta[i][j+1] - v[i][j-1]*zeta[i][j-1])/(2*d)) - ((u[i+1][j]*zeta[i+1][j] - u[i-1][j]*zeta[i-1][j])/(2*d)));
            }
        } 

        coi = 0;
        // Solving Stream Poisson:
        do{
            coi++;
            e1 = 0;
            // Jacobi Iteration:
            for (int i = 1;  i < 100; i++)
            {
                for (int j = 1; j < 100; j++){

                    psit[i][j] = (0.25)*(psi[i+1][j] + psi[i-1][j] + psi[i][j-1] + psi[i][j+1] + zetat[i][j]*(d*d));
                }
            }

            // Error:
            for (int i = 1;  i < 100; i++)
            {
                for (int j = 1; j < 100; j++){
                    e1 += pow((psit[i][j] - psi[i][j]),2);
                }
            }
            e1 = sqrt(e1);

            // Assign to Next step:
            for (int i = 1;  i < 100; i++){
                for (int j = 1; j < 100; j++){
                    psi[i][j] = psit[i][j];
                }
            }

        } while (e1 > 0.0001);
        //cout<<"No. of iterations: "<<coi<<endl;

        // Calculation of Velocities:
        for (int i = 1; i < 100; i++){
            for( int j = 1; j < 100; j++){
                u[i][j] = (psi[i][j+1] - psi[i][j-1])/(2*d);
                v[i][j] = -((psi[i+1][j] - psi[i-1][j])/(2*d));
            }
        }

        // Convergence Criteria:
        for (int i = 1; i < 100; i++){
            for( int j = 1; j < 100; j++){
                z_conv += abs(zetat[i][j] - zeta[i][j]);
                //p_conv += abs(psit[i][j] - psi[i][j]); 
            }
        }

        z_conv = (z_conv)/(101*101);
        //p_conv = (p_conv)/(101*101);

       //cout<<z_conv<<endl;

        // Assign t+1 to t:
        for (int i = 1;  i < 100; i++)
        {
            for (int j = 1; j < 100; j++){
                zeta[i][j] = zetat[i][j];
                psi[i][j] = psit[i][j];
            }
        }

    }while (z_conv > 1e-8);// && p_conv > 1e-8);


    // Writing Output to File:
    ofstream oStream;
    oStream.open("output_vel.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << sqrt(pow(u[i][j],2) + pow(v[i][j],2)) << " ";
        }
        oStream << endl;
    }
    oStream.close();

    return 0;
}
