import { Button } from '@mantine/core';
import { notifySuccess } from 'common/notifications/Notifications';
import { useState } from 'react';
import CommonTextarea from 'scenes/common/input/CommonTextarea';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function Contact() {
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);

    const disabled = !email || !body;

    function doSend() {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            notifySuccess({
                title: 'Contact',
                message: 'Demande de contact envoyée avec succès',
            });
        }, 1300);
    }
    return (
        <div className="flex flex-col">
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Contact',
                    },
                ]}
                title={<CommonTitleLabel label="Contact" />}
            />
            <div className="flex flex-col pt-10 px-4 gap-4">
                <CommonTextInput
                    wrapperClassName="w-1/3"
                    value={email}
                    label="Email"
                    required
                    error={!email}
                    onChange={setEmail}
                    placeholder="admin@alten.com"
                />
                <CommonTextarea
                    className="w-1/3"
                    minRows={4}
                    maxRows={6}
                    maxLength={300}
                    value={body}
                    label="Body"
                    required
                    error={!email}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Issue when trying to add item to basket"
                />
                <Button
                    className="w-1/6"
                    onClick={doSend}
                    disabled={disabled}
                    loading={sending}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Contact;
