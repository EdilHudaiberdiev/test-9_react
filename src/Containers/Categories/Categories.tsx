import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import CustomModal from '../../Components/UI/CustomModal/CustomModal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {addCategory, editCategoryById, getCategories, getCategoryById} from '../../store/CategoryThunk';

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector((state: RootState) => state.categories.categories);
  const categoryToEdit = useSelector((state: RootState) => state.categories.categoryToEdit);
  const categoriesLoading = useSelector((state: RootState) => state.categories.isLoading);
  const [category, setCategory] = useState({
    type: 'income',
    title: '',
  });

  useEffect(() => {
    if (categoriesList.length === 0)   dispatch(getCategories());

    if (categoryToEdit) setCategory({...categoryToEdit});
  }, [dispatch, categoryToEdit]);


  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (category.title.trim().length === 0) {
      confirm('Title must be fulled');
    } else {
      await dispatch(addCategory({...category}));
      setModalOpen(false);
    }
  };

  const editCategory = async (id: string) => {
    setEditModalOpen(true);
    await dispatch(getCategoryById(id));

  };


  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    await dispatch(editCategoryById({ category: category, id }));
    setEditModalOpen(false);
    dispatch(getCategories());
  };

  return (
    <div className="mt-5 w-75 mx-auto">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Categories</h4>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Add</button>

        <CustomModal open={modalOpen} handleClose={() => setModalOpen(false)}>
          <form className="p-5 mx-auto" onSubmit={onSubmit}>
            <h4>Add category</h4>
            <div className="my-4">
              <label htmlFor="title" className="fw-bold me-2">Title:</label>
              <input className="form-control" type="text" name="title" id="title" onChange={changeForm}/>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="fw-bold me-2">Type:</label>
              <select  className="form-control" value={category.type} name="type" id="type" onChange={changeForm}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit" disabled={category.title.trim().length === 0}>Add</button>
            <button className="btn btn-warning ms-3" type="button" onClick={() => setModalOpen(false)}>Cancel</button>
          </form>
        </CustomModal>
      </div>

      <div className="mt-3">
        <hr/>
        {categoriesLoading ? <Spinner/> :
          <>
            {categoriesList.length === 0 ? <h4>No categories yet</h4> :
              <>
                {categoriesList.map(categoryItem => (
                  <div key={categoryItem.id} className="d-flex">
                    <p>{categoryItem.title} </p>
                    <p>{categoryItem.type} </p>
                    <button className="btn  btn-warning" onClick={() => editCategory(categoryItem.id)}>Edit</button>
                    <button className="btn btn-danger ms-3">Delete</button>

                    <CustomModal open={editModalOpen} handleClose={() => setEditModalOpen(false)}>
                      <form className="p-5 mx-auto" onSubmit={e => onEditSubmit(e,categoryItem.id)}>
                        <h4>Edit category</h4>
                        <div className="my-4">
                          <label htmlFor="title" className="fw-bold me-2">Title:</label>
                          <input value={category.title} className="form-control" type="text" name="title" id="title" onChange={changeForm}/>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="type" className="fw-bold me-2">Type:</label>
                          <select  className="form-control" value={category.type} name="type" id="type" onChange={changeForm}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                          </select>
                        </div>

                        <button className="btn btn-primary" type="submit" disabled={category.title.trim().length === 0}>Edit</button>
                        <button className="btn btn-warning ms-3" type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                      </form>
                    </CustomModal>
                  </div>
                ))}
              </>
            }
          </>
        }
      </div>
    </div>
  );
};

export default Categories;