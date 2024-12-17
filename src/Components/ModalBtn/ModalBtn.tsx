import React, { useContext, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAddItemMutation } from '../../Redux/Api';
import swal from "sweetalert";
import { PostData } from '../../Context/PostData';

interface ModalBtnProps {
  onClose: () => void;
  modal2Open: boolean;
  setModal2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBtn: React.FC<ModalBtnProps> = ({   onClose, modal2Open, setModal2Open }) => {
  const [addItem, { isError }] = useAddItemMutation();
  const { currentItem, setCurrentItem ,mode} = useContext(PostData);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters'),
    body: Yup.string()
      .required('Body is required')
      .min(5, 'Body must be at least 5 characters'),
  });

  useEffect(() => {
    // Reset form values when currentItem changes
    if (currentItem) {
      setModal2Open(true); // Ensure modal is open when changing items
    } else {
      setModal2Open(false); // Close modal if no item is selected
    }
  }, [currentItem, setModal2Open]);

  return (
    <>
      <Button type="primary" className="ModalBtn" onClick={() => {
        setCurrentItem(null); // Reset the current item when opening a new modal
        setModal2Open(true);
      }}>
        Add New Post
      </Button>
      <Modal
        centered
        open={modal2Open}
        onCancel={() => { 
          setModal2Open(false); 
          onClose(); 
          setCurrentItem(null); // Ensure currentItem is reset when modal closes
        }}
        footer={null}
      >
        <Formik
          initialValues={{ title: currentItem?.title || '', body: currentItem?.body || '' }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            try {
              if (mode === 'edit') {
                // Edit existing item
                const response = await addItem({ id: currentItem?.id, updatedItem: values }).unwrap();
                swal("Success", "The post was successfully edited", "success");
              } else {
                // Add new item
                const response = await addItem({ newItem: values }).unwrap();
                swal("Success", "The post was successfully added", "success");
              }
              resetForm();
              setModal2Open(false);
              onClose(); // Close the modal when done
            } catch (error) {
              console.error('Error:', error);
              swal("Error", "An error occurred while saving the post check your internet", "error");
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Title"
                validateStatus={touched.title && errors.title ? 'error' : ''}
                help={touched.title && errors.title ? errors.title : null}
              >
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter post title"
                />
              </Form.Item>
              <Form.Item
                label="Body"
                validateStatus={touched.body && errors.body ? 'error' : ''}
                help={touched.body && errors.body ? errors.body : null}
              >
                <Input.TextArea
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter post body"
                  rows={4}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {mode === 'edit' ? "Update" : "Submit"}
                </Button>
              
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalBtn;
