import React from 'react';

const checkPasswordStrength = (password, minChar) => {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);

    let strength = 0;

    if (password.length >= minChar) {
        strength++;
    }

    if (lowcase) {
        strength++;
    }

    if (uppcase) {
        strength++;
    }

    if (numbers) {
        strength++;
    }

    if (special) {
        strength++;
    }

    return strength;
};

export const NivelSeguridad = ({ password }) => {
    const strength = checkPasswordStrength(password, 8);

    const getStrengthColor = () => {
        switch (strength) {
            case 0:
            case 1:
                return 'red'; // Débil
            case 2:
            case 3:
                return 'orange'; // Moderado
            case 4:
                return 'blue'; // Fuerte
            case 5:
                return 'green'; // Muy fuerte
            default:
                return 'black'; // Default color
        }
    };

    const getStrengthText = () => {
        switch (strength) {
            case 0:
            case 1:
                return 'Débil';
            case 2:
            case 3:
                return 'Moderado';
            case 4:
                return 'Fuerte';
            case 5:
                return 'Muy fuerte';
            default:
                return ''; // Default text
        }
    };

    return (
        password && (
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <span
                    style={{
                        color: getStrengthColor(),
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '130%',
                        marginBottom: '-1px',
                        marginLeft: '1px',
                        fontSize: '12px'
                    }}
                >
                    Nivel de Seguridad: {getStrengthText()}
                </span>
                <div
                    style={{
                        width: `${(strength / 5) * 100}%`,
                        height: '6px',
                        backgroundColor: getStrengthColor(),
                        borderRadius: '5px'
                    }}
                />
            </div>
        )
    );
};
