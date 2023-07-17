import { useState } from "react";
import style from "./sort.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeSortType } from "../../store/Slices/sortSlice";
import { setCurrentPage } from "../../store/Slices/mainSlice";
import Button from "../UI/Button/Button";

import filter from "./../../assets/images/filter.svg";

const sortValueArr = [
	{ name: "Min price", order: "asc", sortby: "price" },
	{ name: "Max price", order: "desc", sortby: "price" },
];
const categories = [
	"All Plants",
	"House Plants",
	"Succulents",
	"Terrariums",
	"Seeds",
	"Accessories",
];

const Sort = () => {
	const { category } = useSelector(state => state.sort);
	const dispatch = useDispatch();
	const [sortValue, setSortValue] = useState(sortValueArr[1].name);
	const [sortOpened, setSortOpened] = useState(false);
	const [categoryOpened, setCategoryOpened] = useState(false);

	const handleClick = el => {
		setSortValue(el.name);
		dispatch(changeSortType(el));
		setSortOpened(false);
	};
	const handleCategoryClick = category => {
		dispatch(changeCategory(category));
		dispatch(setCurrentPage(0));
	};
	const handleFilterBtnClick = () => {
		setCategoryOpened(!categoryOpened);
	};

	return (
		<div className={style.wrapper}>
			{/*<button className={style.filter_btn}>Filter: </button>*/}
			<Button text='Filter' img={filter} classes='sort' onClick={handleFilterBtnClick} />
			<ul className={[style.filter, categoryOpened ? style.active : ""].join(" ")}>
				{categories.map(categoryName => (
					<li
						onClick={() => handleCategoryClick(categoryName)}
						className={[style.category, category === categoryName ? style.active : ""].join(" ")}
						key={categoryName}
					>
						{categoryName}
					</li>
				))}
			</ul>
			<div className={style.sortBlock}>
				<div className={style.sortTitle}>
					<label>
						Sort by:{" "}
						<input
							onClick={() => setSortOpened(!sortOpened)}
							type='text'
							value={sortValue}
							readOnly
						/>
					</label>
				</div>
				{sortOpened && (
					<ul className={style.sortPopup}>
						{sortValueArr.map(el => (
							<li
								className={el.name === sortValue ? style.active : ""}
								key={el.name}
								onClick={() => handleClick(el)}
							>
								{el.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Sort;
