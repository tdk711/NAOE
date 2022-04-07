///////////// OE5450 Assignment-6 ///////////////
////// Lid-Driven Cavity: V-S Approach ////
////// Dilip Kumar NA18B004 | Spring 2022 //////

#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int main(){
    
    // Declare Variables
    double zeta[101][101], zetat[101][101], psi[101][101], psi0[101][101], psit[101][101], p[101][101], pt[101][101], u[101][101], v[101][101];
    double z_conv, p_conv, e1, e2, ep;

    //Initialising Variables:
    for (int i = 0;  i < 101; i++){
        for (int j = 0; j < 101; j++){
            zeta[i][j] = 0.0;
            zetat[i][j] = 0.0;
            psi[i][j] = 0.0;
            psit[i][j] = 0.0;
            psi0[i][j] = 0.0;
            p[i][j] = 0.0;
            pt[i][j] = 0.0;
            u[i][j] = 0.0;
            v[i][j] = 0.0;
        }
    }
    z_conv = 0.0;
    p_conv = 0.0;
    e1 = 0.0;
    e2 = 0.0;
    ep = 0.0;
    cout<<"Initialisation done"<<endl;

    // Define Output Streams:
    ofstream pStream, zStream;
    pStream.open("output_p.txt");
    zStream.open("output_z.txt");

    // Defining Constants:
    const double Re = 100;
    const double d = 0.05;
    const double dt = 0.01;
    const double U = 1.0;
    cout<<"Definition done"<<endl;

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

    cout<<"Boundary Conditions Assigned"<<endl;
    // Solution:
    do{

        // Vorticity Boundary Conditions: 
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

        // Solving Stream Poisson:
        do{
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
                p_conv += abs(psit[i][j] - psi0[i][j]); 
            }
        }

        z_conv = (z_conv)/(101*101);
        p_conv = (p_conv)/(101*101);

       pStream << p_conv << endl;
       zStream << z_conv << endl;

        // Assign t+1 to t:
        for (int i = 1;  i < 100; i++)
        {
            for (int j = 1; j < 100; j++){
                zeta[i][j] = zetat[i][j];
                psi[i][j] = psit[i][j];
                psi0[i][j] = psit[i][j];
            }
        }

    }while (z_conv > 1e-8 || p_conv > 1e-8);

    cout<<"VS Solved"<< endl;

    pStream.close();
    zStream.close();

    // Pressure Recovery:
    // Update Vorticity BCs:
    for (int i = 0; i < 101; i++){
        zeta[i][100] = (2*(psi[i][100] - U*d -psi[i][99]))/(d*d);  // Lid
        zeta[i][0] = -(2*(psi[i][1] - psi[i][0]))/(d*d); // Bottom
        zeta[0][i] = -(2*(psi[1][i] - psi[0][i]))/(d*d); // Left
        zeta[100][i] = -(2*(psi[99][i] - psi[100][i]))/(d*d); // Right
    }
    
    // Set Reference Pressure:
    p[0][0] = 1.0; 

    // Set Boundary Conditions:
    p[1][0] = (1/(2.0*Re))*(3.0*zeta[1][0] - 4.0*zeta[1][1] + zeta[1][2]) + p[0][0];
    for(int i = 1; i < 100; i++){
        p[i+1][0] = (1/(Re))*(3.0*zeta[i][0] - 4.0*zeta[i][1] + zeta[i][2]) + p[i-1][0]; // Bottom
    }

    p[0][1] = (1/(2.0*Re))*(3.0*zeta[0][1] - 4.0*zeta[1][1] + zeta[2][1]) + p[0][100];
    for(int i = 1; i < 100; i++){
        p[0][i+1] = (1/(Re))*(3.0*zeta[0][i] - 4.0*zeta[1][i] + zeta[2][i]) + p[0][i-1]; // Left
    }

    p[100][1] = (1/(2.0*Re))*(3.0*zeta[100][1] - 4.0*zeta[99][1] + zeta[98][1]) + p[100][0];
    for(int i = 1; i < 100; i++){
        p[100][i+1] = (1/(Re))*(3.0*zeta[100][i] - 4.0*zeta[99][i] + zeta[98][i]) + p[100][i-1]; // Right
    }

    p[99][100] = (1/(2.0*Re))*(3.0*zeta[99][100] - 4.0*zeta[99][99] + zeta[99][98]) + p[100][100];
    for(int i = 1; i < 99; i++){
        p[99-i][100] = (1/(Re))*(3.0*zeta[100-i][100] - 4.0*zeta[100-i][99] + zeta[100-i][98]) + p[101-i][100]; // Top
    }


    // Pressure Poisson:
    do{
        ep = 0;
        // Jacobi Iteration:
        for (int i = 1;  i < 100; i++)
        {
            for (int j = 1; j < 100; j++){

                pt[i][j] = (0.25)*(p[i+1][j] + p[i-1][j] + p[i][j-1] + p[i][j+1] - 2*((((psi[i+1][j] - 2*psi[i][j] + psi[i-1][j])*(psi[i][j+1] - 2*psi[i][j] + psi[i][j-1]))/(d*d)) 
                - ((psi[i+1][j+1] - psi[i+1][j-1] - psi[i-1][j+1] + psi[i-1][j-1])/(4.0*d))*((psi[i+1][j+1] - psi[i+1][j-1] - psi[i-1][j+1] + psi[i-1][j-1])/(4.0*d))));
            }
        }

        // Error:
        for (int i = 1;  i < 100; i++)
        {
            for (int j = 1; j < 100; j++){
                ep += pow((pt[i][j] - p[i][j]),2);
            }
        }
        ep = sqrt(ep);

        // Assign to Next step:
        for (int i = 0;  i < 101; i++){
            for (int j = 0; j < 101; j++){
                p[i][j] = pt[i][j];
            }
        }

        } while (ep > 0.0001);

    cout<<"Pressure Solved."<<endl;

    // X velocity output:
    ofstream oStream;
    oStream.open("output_u.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << u[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Y velocity output:
    oStream.open("output_v.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << v[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Total velocity output:
    oStream.open("output_vel.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << sqrt(pow(u[i][j],2) + pow(v[i][j],2)) << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Pressure output:
    oStream.open("output_pr.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << p[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Stream Function output:
    oStream.open("output_psi.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << psi[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();

    // Vorticity output:
    oStream.open("output_zeta.txt");

    for (int j = 100;  j >= 0; j--)
    {
        for (int i = 0; i < 101; i++){
            oStream << zeta[i][j] << " ";
        }
        oStream << endl;
    }
    oStream.close();


    return 0;
}
