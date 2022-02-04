program areas
    implicit none
    real ,external :: area
    real :: b1, b2, h, a1, a2, total, b, r1, r2

    h = 4.5
    b = 8.0
    r1 = 1.0
    r2 = 2.0
    a1 = 0.0
    a2 = 0.0
    total = 0.0

    b1 = r1*(b/(r1 + r2));
    b2 = r2*(b/(r1 + r2));


    a1 = area(b1, h)
    a2 = area(b2, h)

    total = a1 + a2
    print*, 'The Area is', total
end program areas

real function area(base, height)
    implicit none
    real :: dy, dx, interior_area, boundary_area, base, height, q
    integer :: total_y_steps, i

    q = 0.0
    dy = 0.00001
    interior_area = 0.0
    boundary_area = 0.0
    dx = (base/height)*dy;
    total_y_steps = int(height/dy)

    do i = 1, total_y_steps     
        q = real(i)
        interior_area = interior_area + dy*(base - q*dx);
        boundary_area = boundary_area + 0.5*(dy*dx);
    end do
    
    area = interior_area + boundary_area
    return
end function area