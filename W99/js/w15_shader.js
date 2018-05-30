function phong_frag()
{
    varying vec3 point_color;
    varying vec4 point_position;
    varying vec3 normal_vector;
    uniform vec3 light_position;
    // LambertianReflection function here
    vec3 LambertianReflection( vec3 C, vec3 L, vec3 N ) {
        float ka = 0.4;
        float kd = 0.6;
        
        float dd = max(dot( N, L ), 0.0 );
        float Ia = ka;
        float Id = kd * dd;
        return C * ( Ia + Id );
    }
    void main()
    {
         vec3 C = point_color;
         vec3 L = normalize( light_position - point_position.xyz ); 
         vec3 N = normalize( normal_vector );
         vec3 shaded_color = LambertianReflection( C, L, N );
         gl_FragColor = vec4( shaded_color, 1.0 );
    }
}

function phong_vert()
{
    varying vec3 point_color;
    varying vec4 point_position;
    varying vec3 normal_vector;
    
    void main() {
        point_color = vec3(1.0, 0.4, 0.4);//color;
        point_position = modelViewMatrix * vec4( position, 1.0 ); 
        normal_vector = normalMatrix * normal;
        gl_Position = projectionMatrix * point_position;
    } 
}