package dev.remito.color;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ColorServiceTest {
	
	@Mock
	ColorRepository colorRepository;
	@Mock
	ColorMapper colorMapper;
	
	@InjectMocks
	ColorService colorService;
	
	private ColorDto colorDto;
	private Color color;
	
	@BeforeEach
	void setUp() {
		color = Color.builder().id(1L).name("black").hexCode("#000").build();
		
		colorDto = new ColorDto(1L, "black", "#000");
	}
	
	@Test
	@DisplayName("findAll —  returns all colors")
	void findAll_returnsAll() {
		when(colorRepository.findAll()).thenReturn(List.of(color));
		when(colorMapper.toDto(color)).thenReturn(colorDto);
		
		List<ColorDto> result = colorService.findAll();
		
		assertThat(result).hasSize(1);
		assertThat(result.getFirst().name()).isEqualTo("black");
		
		verify(colorRepository).findAll();
		verify(colorMapper).toDto(color);
	}
	
	@Test
	@DisplayName("create —  saves new color")
	void create_returnsAll() {
		var request = new ColorRequest("black", "#000");
		
		when(colorRepository.existsByName("black")).thenReturn(false);
		when(colorRepository.save(any(Color.class))).thenReturn(color);
		when(colorMapper.toDto(color)).thenReturn(colorDto);
		
		ColorDto result = colorService.create(request);
		
		assertThat(result.name()).isEqualTo("black");
		
		verify(colorRepository).existsByName("black");
		verify(colorRepository).save(any(Color.class));
		verify(colorMapper).toDto(color);
	}
	
	@Test
	@DisplayName("create —  throws if color already exists")
	void create_alreadyExists() {
		ColorRequest request = new ColorRequest("black", "#000");
		
		when(colorRepository.existsByName("black")).thenReturn(true);
		
		assertThatThrownBy(() -> colorService.create(request))
			.isInstanceOf(AlreadyExistsException.class)
			.hasMessageContaining("Color already exists");
		
		verify(colorRepository).existsByName("black");
		verify(colorRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("update —  updates existing color")
	void update_success() {
		ColorRequest request = new ColorRequest("Blue", "#0000FF");
		
		when(colorRepository.findById(1L)).thenReturn(Optional.of(color));
		when(colorRepository.save(color)).thenReturn(color);
		when(colorMapper.toDto(color)).thenReturn(colorDto);
		
		ColorDto result = colorService.update(1L, request);
		
		assertThat(color.getName()).isEqualTo("Blue");
		assertThat(color.getHexCode()).isEqualTo("#0000FF");
		assertThat(result.name()).isEqualTo("Blue");
		
		verify(colorRepository).findById(1L);
		verify(colorRepository).save(color);
		verify(colorMapper).toDto(color);
	}
	
	@Test
	@DisplayName("update —  throws if not found")
	void update_notFound() {
		ColorRequest request = new ColorRequest("Blue", "#0000FF");
		
		when(colorRepository.findById(1L)).thenReturn(Optional.empty());
		
		assertThatThrownBy(() -> colorService.update(1L, request))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("Color not found");
		
		verify(colorRepository).findById(1L);
		verify(colorRepository, never()).save(any());
	}
	
	@Test
	@DisplayName("delete —  deletes existing color")
	void delete_success() {
		when(colorRepository.existsById(1L)).thenReturn(true);
		
		colorService.delete(1L);
		
		verify(colorRepository).existsById(1L);
		verify(colorRepository).deleteById(1L);
	}
	
	@Test
	@DisplayName("delete —  throws if not found")
	void delete_notFound() {
		when(colorRepository.existsById(1L)).thenReturn(false);
		
		assertThatThrownBy(() -> colorService.delete(1L))
			.isInstanceOf(ResourceNotFoundException.class)
			.hasMessageContaining("Color not found");
		
		verify(colorRepository).existsById(1L);
		verify(colorRepository, never()).deleteById(any());
	}
}
