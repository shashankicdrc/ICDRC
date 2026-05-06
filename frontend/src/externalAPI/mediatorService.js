import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const applyForMediator = async (mediatorData) => {
    try {
        const result = await fetch(`${BASE_URL}/api/mediators/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mediatorData),
        });
        
        const data = await result.json();
        
        // Follow the pattern from other services if they return statusCode and status
        if (data.statusCode && data.status && data.statusCode !== httpStatusCode.OK && data.status !== httpStatus.SUCCESS) {
            return { error: data.message || 'Failed to apply' };
        }
        
        if (!result.ok) {
            return { error: data.message || 'Something went wrong' };
        }
        
        return { message: data.message || 'Success', data: data.data || data };
    } catch (error) {
        return { error: error.message };
    }
};
